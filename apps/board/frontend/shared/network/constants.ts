import { fz } from '#/shared/data/utils/object'

export const NetworkDefaults = fz({
  // 前端传入 auth、user 等相对路径，这里统一补成当前网站下的 /api/auth、/api/user。
  API_PREFIX: '/api',
  // 接口 15 秒还没返回就判定超时，避免页面一直显示加载中。
  TIMEOUT: 15_000,
})
export type NetworkDefaults = (typeof NetworkDefaults)[keyof typeof NetworkDefaults]
