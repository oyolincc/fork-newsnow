import { ErrorHttpStatus } from '@/hono/shared/errors/constants'
import { defineErrorCategories } from '@/hono/shared/errors/proto'

export const E = defineErrorCategories({
  NORMAL: {
    VALIDATION: { status: ErrorHttpStatus.UNPROCESSABLE_ENTITY, message: '请求参数无效' },
    INTERNAL: { status: ErrorHttpStatus.INTERNAL, message: '服务器内部错误' },
    NOT_FOUND: { status: ErrorHttpStatus.NOT_FOUND, message: '资源不存在' },
  },
  AUTH: {
    REQUIRED: { status: ErrorHttpStatus.UNAUTHENTICATED, message: '需要登录' },
    DISABLED: { status: ErrorHttpStatus.UNAVAILABLE, message: 'GitHub 登录未配置' },
    OAUTH: { status: ErrorHttpStatus.UNAUTHENTICATED, message: 'GitHub 登录校验失败' },
  },
  USER: {
    NOT_FOUND: { status: ErrorHttpStatus.NOT_FOUND, message: '用户不存在' },
    SYNC_CONFLICT: { status: ErrorHttpStatus.ABORTED, message: '同步数据版本冲突' },
  },
  SOURCE: {
    NOT_FOUND: { status: ErrorHttpStatus.NOT_FOUND, message: '新闻源不存在' },
    FETCH_FAILED: { status: ErrorHttpStatus.INTERNAL, message: '新闻源抓取失败' },
    SNAPSHOT_DISABLED: { status: ErrorHttpStatus.UNAVAILABLE, message: '快照功能未启用' },
    REFRESH_FORBIDDEN: { status: ErrorHttpStatus.UNAUTHENTICATED, message: '登录后才能主动刷新' },
  },
})
