import type { ProblemDetailsError, ProblemDetailsInput } from 'hono-problem-details'
import type { ErrorHttpStatus } from './constants'

export interface Recursive<T> {
  [key: string]: Recursive<T> | T
}

export type ErrorCategoryItem = {
  status: ErrorHttpStatus
  message: string
}

export type ErrorCreateInput = {
  msgContext?: Record<string, unknown>
  message?: string
  cause?: unknown
} & Omit<ProblemDetailsInput, 'status' | 'type' | 'message'>

export type WithErrorType<T, Prefix extends string = ''> = T extends ErrorCategoryItem
  ? T & { type: Prefix; create: (input?: ErrorCreateInput) => ProblemDetailsError }
  : {
      [K in keyof T]: WithErrorType<
        T[K],
        Prefix extends '' ? K & string : `${Prefix}.${K & string}`
      >
    }
