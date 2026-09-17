import { AuthType } from '@newsnow/definition/frontend'
import { fz } from '#/shared/data/utils/object'

export const AuthDefaults = fz({
  // localStorage 只存头像、昵称等展示信息，不存 token；服务端仍以浏览器自动携带的 HttpOnly Cookie 为准。
  STORAGE_KEY: 'newsnow:auth-user',
  // 以后修改缓存格式时把这个数字加一，旧版本数据会被清掉，不会按新格式硬读。
  SESSION_VERSION: 1,
  // GitHub 登录完成会跳回 `?login=github`，页面看到它才请求一次当前用户信息。
  OAUTH_MARKER: 'login',
  // 目前只支持 GitHub，这个值用来核对上面的 login 参数。
  OAUTH_PROVIDER: AuthType.GITHUB,
  // 点击登录后整页跳到这个地址，由服务端继续跳转到 GitHub 授权页。
  LOGIN_URL: '/api/auth/github/login',
})
export type AuthDefaults = (typeof AuthDefaults)[keyof typeof AuthDefaults]
