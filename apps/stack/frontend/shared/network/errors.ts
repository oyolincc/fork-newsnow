import type { HTTPError } from 'ky'

export type ProblemDetails = {
  type?: string
  title?: string
  status?: number
  detail?: string
  message?: string
  extensions?: Record<string, unknown>
  [key: string]: unknown
}

export class ApiError extends Error {
  constructor(
    public readonly problem: ProblemDetails,
    options?: ErrorOptions,
  ) {
    super(problem.detail || problem.message || problem.title || 'Request failed', options)
    this.name = 'ApiError'
  }
  get status() {
    return this.problem.status
  }
}

export const isApiError = (error: unknown, status?: number): error is ApiError =>
  error instanceof ApiError && (status === undefined || error.status === status)

export async function parseApiError(error: HTTPError) {
  const fallback = { title: error.response.statusText }
  const problem = await error.response.json<ProblemDetails>().catch(() => fallback)
  return new ApiError({ ...problem, status: error.response.status }, { cause: error })
}
