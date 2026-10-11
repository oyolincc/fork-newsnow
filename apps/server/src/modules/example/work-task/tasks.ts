import type { ProcessExampleInput, ProcessExampleOutput } from "@newsnow/definition/backend";
import { type WorkSubject } from "@/infra/work-runner/constants";
import type {
  DefineRunnerTaskModel,
  RunnerTaskResult,
  WorkerMessagePort,
} from "@/infra/work-runner/types";
import {
  isWorkerTaskBusinessError,
  WorkerTaskBusinessError,
} from "@/infra/work-runner/utils/business-error";
import { workerLog, workerProgress } from "@/infra/work-runner/utils/message";

export type ExampleTaskErrorCode = "EXAMPLE_PROCESS_FAILED";

export type ExampleRunnerTaskModel = DefineRunnerTaskModel<
  typeof WorkSubject.PROCESS_EXAMPLE,
  ProcessExampleInput,
  ProcessExampleOutput,
  ExampleTaskErrorCode
>;

export async function executeExampleTask(
  input: ExampleRunnerTaskModel["input"],
  messagePort: WorkerMessagePort,
): Promise<RunnerTaskResult<ProcessExampleOutput, ExampleTaskErrorCode>> {
  try {
    workerLog(messagePort, "debug", "Example task started");
    workerProgress(messagePort, 0, "Validating input");

    const original = input.message;
    const normalized = original.trim().replace(/\s+/g, " ");
    if (!normalized) {
      throw new WorkerTaskBusinessError("Message must not be empty", { field: "message" });
    }

    workerProgress(messagePort, 100, "Example task completed");
    const result = {
      ok: true,
      data: { original, normalized, length: normalized.length },
    } as const;
    messagePort.postMessage({ type: "result", data: result.data });
    return result;
  } catch (error) {
    if (!isWorkerTaskBusinessError(error)) throw error;

    const result: RunnerTaskResult<ProcessExampleOutput, ExampleTaskErrorCode> = {
      ok: false,
      error: {
        code: "EXAMPLE_PROCESS_FAILED",
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
    };
    messagePort.postMessage({ type: "error", error: result.error });
    return result;
  }
}
