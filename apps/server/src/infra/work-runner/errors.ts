import { hasProp } from '@/shared/utils'
import { WorkerErrorCode } from './constants'
import type { RunnerTaskError, RunnerTaskErrorDetails } from './types'

const workerErrorCodes = Object.values(WorkerErrorCode)

export class WorkerTaskError extends Error {
  readonly code: WorkerErrorCode
  readonly details?: RunnerTaskErrorDetails

  constructor(
    code: WorkerErrorCode,
    message: string,
    details?: RunnerTaskErrorDetails,
    cause?: unknown,
  ) {
    super(message, { cause })
    this.name = 'WorkerTaskError'
    this.code = code
    this.details = details
  }

  serialize(): RunnerTaskError<WorkerErrorCode> {
    return {
      code: this.code,
      message: this.message,
      ...(this.details ? { details: this.details } : {}),
      ...(this.cause ? { cause: this.cause } : {}),
    }
  }
}

export function isWorkerTaskError(error: unknown): error is WorkerTaskError {
  return (
    error instanceof WorkerTaskError ||
    (error instanceof Error &&
      hasProp(error, 'code') &&
      workerErrorCodes.includes(error.code as WorkerErrorCode))
  )
}
