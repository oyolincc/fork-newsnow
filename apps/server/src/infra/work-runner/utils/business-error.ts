import { hasProp } from '@/shared/utils'
import type { RunnerTaskErrorDetails } from '../types'

export class WorkerTaskBusinessError extends Error {
  readonly details?: RunnerTaskErrorDetails

  constructor(message: string, details?: RunnerTaskErrorDetails, cause?: unknown) {
    super(message, { cause })
    this.name = 'WorkerTaskBusinessError'
    this.details = details
  }
}

export function isWorkerTaskBusinessError(error: unknown): error is WorkerTaskBusinessError {
  return (
    error instanceof WorkerTaskBusinessError ||
    (error instanceof Error && hasProp(error, 'name') && error.name === 'WorkerTaskBusinessError')
  )
}
