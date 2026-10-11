import { type WorkerConfig } from "@newsnow/definition/backend";
import type {
  AppWorkRunner,
  RunnerTaskInvocation,
  RunnerTaskParams,
  RunnerTaskRunOptions,
  RunnerTaskRunResult,
  WorkerMessage,
} from "../types";
import { WorkerErrorCode, WorkSubject } from "../constants";
import { isWorkerTaskError, WorkerTaskError } from "../errors";
import Piscina from "piscina";
import path from "node:path";
import { MessageChannel, type MessagePort } from "node:worker_threads";
import workersDir from "virtual:workers";
import { getLogger } from "@/infra/logger/getter";
import type * as ExampleWorker from "../example/worker-entry";
import { handleWorkerMessage } from "../utils/message";

const taskNameMap = {
  [WorkSubject.PROCESS_EXAMPLE]: "executeExampleTask",
} satisfies Partial<Record<WorkSubject, keyof typeof ExampleWorker>>;

export class PiscinaWorkRunner implements AppWorkRunner {
  static #instance: PiscinaWorkRunner | null = null;
  readonly #pool: Piscina;
  readonly #config: WorkerConfig;

  private constructor(config: WorkerConfig) {
    if (!config) {
      throw new Error("[PiscinaWorkRunner] config is required");
    }
    this.#pool = new Piscina({
      filename: path.join(workersDir, "example-worker.mjs"),
      minThreads: config.minThreads,
      maxThreads: config.maxThreads,
      concurrentTasksPerWorker: config.concurrentTasksPerWorker,
      maxQueue: config.maxQueue,
    });
    this.#config = config;
  }

  public static getInstance(config: WorkerConfig): PiscinaWorkRunner {
    if (!this.#instance) {
      getLogger().info({ worker: config }, "PiscinaWorkRunner initialized");
      this.#instance = new PiscinaWorkRunner(config);
    }
    return this.#instance;
  }

  async run<TSubject extends WorkSubject>(
    taskParams: RunnerTaskParams<TSubject>,
    options?: RunnerTaskRunOptions,
  ): Promise<RunnerTaskRunResult<TSubject>> {
    const targetName = taskNameMap[taskParams.subject];
    if (!targetName) {
      throw new Error(`[PiscinaWorkRunner] task name not found: ${taskParams.subject}`);
    }

    let timeoutTimer: ReturnType<typeof setTimeout> | undefined;
    let result: RunnerTaskRunResult<TSubject>;
    let workerMessagePort: MessagePort | undefined;

    const { signal: optSignal, transferList } = options || {};
    const logger = getLogger();
    // pool当前状态
    const poolStats = {
      idleThreads: this.#pool.idleThreads,
      threads: this.#pool.threads.length,
      queueSize: this.#pool.queueSize,
    };
    logger.assign({
      pool: poolStats,
      subject: taskParams.subject,
    });

    try {
      optSignal?.throwIfAborted();

      // 判断队列已满
      const enableQueue = this.#pool.options.maxQueue > 0;
      if (
        (enableQueue && poolStats.queueSize >= this.#pool.options.maxQueue) ||
        (!enableQueue && poolStats.idleThreads <= 0)
      ) {
        throw new WorkerTaskError(WorkerErrorCode.QUEUE_FULL, "Worker queue is full", {
          enableQueue,
          queueSize: poolStats.queueSize,
          maxQueue: this.#config.maxQueue,
        });
      }

      logger.debug("Worker task dispatching");

      // 建立收发端
      const { port1: messagePort, port2 } = new MessageChannel();
      workerMessagePort = port2;
      messagePort.on("message", (message: WorkerMessage) =>
        handleWorkerMessage(message, logger, { subject: taskParams.subject }),
      );
      messagePort.unref();

      // 设置任务信号和超时
      let taskSignal = optSignal;
      let timeoutPromise: Promise<never> | undefined;
      if (this.#config.workerTaskTimeoutMs > 0) {
        const timeoutController = new AbortController();
        taskSignal = optSignal
          ? AbortSignal.any([optSignal, timeoutController.signal])
          : timeoutController.signal;
        timeoutPromise = new Promise<never>((_, reject) => {
          timeoutTimer = setTimeout(() => {
            const error = new WorkerTaskError(
              WorkerErrorCode.TASK_TIMEOUT,
              `Worker task timed out after ${this.#config.workerTaskTimeoutMs}ms`,
              { timeoutMs: this.#config.workerTaskTimeoutMs },
            );
            reject(error);
            timeoutController.abort(error);
          }, this.#config.workerTaskTimeoutMs);
          timeoutTimer.unref();
        });
      }

      // 开始调用
      const invocation: RunnerTaskInvocation<(typeof taskParams)["input"]> = {
        input: taskParams.input,
        messagePort: workerMessagePort,
      };
      const taskPromise = this.#pool.run(invocation, {
        name: targetName,
        signal: taskSignal,
        transferList: [...(transferList || []), workerMessagePort],
      }) as Promise<RunnerTaskRunResult<TSubject>>;

      result = timeoutPromise
        ? await Promise.race([taskPromise, timeoutPromise])
        : await taskPromise;
    } catch (error) {
      if (isWorkerTaskError(error)) {
        result = {
          ok: false,
          error: error.serialize(),
        };
      } else if (error instanceof Error && error.name === "AbortError") {
        result = {
          ok: false,
          error: new WorkerTaskError(
            WorkerErrorCode.TASK_ABORTED,
            error.message,
            undefined,
          ).serialize(),
        };
      } else {
        result = {
          ok: false,
          error: new WorkerTaskError(
            WorkerErrorCode.UNKNOWN,
            "Worker task failed unexpectedly",
            undefined,
            error,
          ).serialize(),
        };
      }
    } finally {
      if (timeoutTimer) clearTimeout(timeoutTimer);
      try {
        workerMessagePort?.close();
      } catch {
        // 忽略已 transfer/detached 端口的 close 异常
      }
    }

    logger[result.ok ? "info" : "error"](
      { subject: taskParams.subject, ok: result.ok },
      `Worker task ${result.ok ? "completed" : "failed"}`,
    );
    return result;
  }

  async shutdown(): Promise<void> {
    await this.#pool.close();
    if (PiscinaWorkRunner.#instance === this) PiscinaWorkRunner.#instance = null;
  }
}
