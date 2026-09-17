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
    super(problem.detail || problem.message || problem.title || '请求失败', options)
    this.name = 'ApiError'
  }

  get status() {
    return this.problem.status
  }
}

// `isApiError(error, 401)` 一次完成两件事：确认它是接口错误，并确认状态码是 401。
export const isApiError = (error: unknown, status?: number): error is ApiError =>
  error instanceof ApiError && (status === undefined || error.status === status)

export async function parseApiError(error: HTTPError) {
  // 如果响应不是合法 JSON，就用 HTTP 自带的状态文字；无论哪种情况都保留状态码和原始错误供排查。
  const fallback = { title: error.response.statusText }
  const problem = await error.response.json<ProblemDetails>().catch(() => fallback)
  return new ApiError({ ...problem, status: error.response.status }, { cause: error })
}
