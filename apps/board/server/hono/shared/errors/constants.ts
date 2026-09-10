import { fz } from '@/hono/shared/utils'

export const ErrorHttpStatus = fz({
  CANCELLED: 499,
  UNKNOWN: 500,
  INVALID_ARGUMENT: 400,
  UNPROCESSABLE_ENTITY: 422,
  DEADLINE_EXCEEDED: 504,
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409,
  ABORTED: 409,
  PERMISSION_DENIED: 403,
  UNAUTHENTICATED: 401,
  RESOURCE_EXHAUSTED: 429,
  FAILED_PRECONDITION: 400,
  OUT_OF_RANGE: 400,
  UNIMPLEMENTED: 501,
  INTERNAL: 500,
  UNAVAILABLE: 503,
  DATA_LOSS: 500,
})
export type ErrorHttpStatus = (typeof ErrorHttpStatus)[keyof typeof ErrorHttpStatus]

// TODO: 仍缺 405、502 等语义；本期上游异常按已有 500 分类映射，未来应先补齐状态常量再细分错误。
