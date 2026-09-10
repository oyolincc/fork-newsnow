import ky, { type Options, type KyInstance, isKyError, isTimeoutError } from 'ky'
import { defu } from 'defu'
import type { AppDependencies } from '@/hono/shared/app/types'

const defaultBaseOptions: Options = {
  // 默认手动处理重定向，避免ky自动重定向导致请求失败
  redirect: 'manual',
  retry: {
    // 默认不重试
    limit: 0,
    // 如果配置了重试，则 如果是http错误或超时，超时则重试，否则走默认行为；
    // 其他情况可能是hooks内代码逻辑报错，不重试
    shouldRetry({ error }) {
      if (isKyError(error)) {
        if (isTimeoutError(error)) {
          return true
        }
        return undefined
      }
      return false
    },
  },
}

export function getOptions(options?: Options): Options {
  return defu({}, defaultBaseOptions, options)
}

/**
 * 创建基础请求器
 * 适用于Node.js和浏览器环境，不包含业务逻辑
 * beforeRequest -> afterResponse -> beforeError -> shouldRetry -> beforeRetry -> beforeRequest -> ...
 */
export function createFetcher(options?: Options): KyInstance {
  return ky.create(getOptions(options))
}

export type FetcherType = keyof Pick<AppDependencies, 'sourceFetcher' | 'githubFetcher'>
