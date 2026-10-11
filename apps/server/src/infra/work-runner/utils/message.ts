import type { AppLogger } from '@/shared/app/types'
import type { RunnerTaskErrorDetails, WorkerMessage, WorkerMessagePort } from '../types'
import type { WorkSubject } from '../constants'

export function workerLog(
  messagePort: WorkerMessagePort,
  level: Extract<WorkerMessage, { type: 'log' }>['level'],
  message: string,
  data?: RunnerTaskErrorDetails,
): void {
  messagePort.postMessage({ type: 'log', level, message, data } satisfies WorkerMessage)
}

export function workerProgress(
  messagePort: WorkerMessagePort,
  value: number,
  message?: string,
): void {
  messagePort.postMessage({ type: 'progress', value, message } satisfies WorkerMessage)
}

export function handleWorkerMessage(
  message: WorkerMessage,
  logger: AppLogger,
  context: {
    subject: WorkSubject
  },
): void {
  switch (message.type) {
    case 'log':
      logger[message.level]({ subject: context.subject, worker: message.data }, message.message)
      break
    case 'progress':
      logger.debug(
        { subject: context.subject, progress: message.value },
        message.message || 'Worker progress',
      )
      break
    case 'result':
      logger.debug({ subject: context.subject }, 'Worker result delivered')
      break
    case 'error':
      logger.warn(
        { subject: context.subject, workerError: message.error },
        'Worker error delivered',
      )
      break
  }
}
