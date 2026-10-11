import { executeExampleTask } from '../example/worker-entry'
import { getLogger } from '@/infra/logger/getter'
import { WorkSubject } from '../constants'
import type {
  AppWorkRunner,
  RunnerTaskParams,
  RunnerTaskRunOptions,
  RunnerTaskRunResult,
  WorkerMessage,
  WorkerMessagePort,
} from '../types'
import { handleWorkerMessage } from '../utils/message'

function createMessagePort(subject: WorkSubject): WorkerMessagePort {
  const logger = getLogger()
  return {
    postMessage(message: WorkerMessage) {
      handleWorkerMessage(message, logger, { subject })
    },
    close() {},
  }
}

export class PassThroughWorkRunner implements AppWorkRunner {
  async run<TSubject extends WorkSubject>(
    taskParams: RunnerTaskParams<TSubject>,
    options?: RunnerTaskRunOptions,
  ): Promise<RunnerTaskRunResult<TSubject>> {
    if (taskParams.subject !== WorkSubject.PROCESS_EXAMPLE) {
      throw new Error(`[PassThroughWorkRunner] task name not found: ${String(taskParams.subject)}`)
    }

    options?.signal?.throwIfAborted()

    return executeExampleTask({
      input: taskParams.input,
      messagePort: createMessagePort(taskParams.subject),
    }) as Promise<RunnerTaskRunResult<TSubject>>
  }

  async shutdown(): Promise<void> {}
}
