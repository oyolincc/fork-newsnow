import ky, { HTTPError, type Options } from 'ky'
import { NetworkDefaults } from './constants'
import { parseApiError } from './errors'

type UnauthorizedListener = () => void

const unauthorizedListeners = new Set<UnauthorizedListener>()

export function onUnauthorized(listener: UnauthorizedListener) {
  unauthorizedListeners.add(listener)
  return () => {
    unauthorizedListeners.delete(listener)
  }
}

const client = ky.create({
  prefix: NetworkDefaults.API_PREFIX,
  timeout: NetworkDefaults.TIMEOUT,
  retry: 0,
})

/**
 * 所有接口都从这里发出：成功时直接返回响应里的 data，失败时统一抛出带 HTTP 状态码的 ApiError。
 * 这个实例不保存 token 或用户资料，浏览器可以共用。以后如果改成服务端预取数据，必须为每次访问
 * 单独创建实例，并把该访问者的 Cookie 转发给接口，否则可能拿错登录态。
 */
export async function request<T>(path: string, options?: Options) {
  try {
    const response = await client(path, options).json<{ data: T }>()
    return response.data
  } catch (error) {
    if (error instanceof HTTPError) {
      const apiError = await parseApiError(error)
      if (apiError.status === 401) unauthorizedListeners.forEach((listener) => listener())
      throw apiError
    }
    throw error
  }
}
