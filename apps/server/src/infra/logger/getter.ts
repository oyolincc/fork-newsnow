import type { AppEnv, AppLogger } from '@/shared/app/types'
import { hasProp } from '@/shared/utils'
import { getContext } from 'hono/context-storage'

// 1. 创建无限递归的空代理，用于抹平高级日志库独有的非核心属性/方法（如 logger.bindings(), logger.flush()）
const dummyFn = () => noopProxy
const noopProxy: any = new Proxy(dummyFn, {
  get: () => noopProxy,
  apply: () => noopProxy,
})

// 2. 自定义日志级别到 Console 方法的映射
const mapToConsoleMethod: Record<string, string> = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
  fatal: 'error', // Console 没有 fatal，将其降级映射为 error
  silent: 'debug', // 理论上不该输出，但做个兜底防崩溃
}

export const fallbackLogger = new Proxy(console, {
  get(target, prop, receiver) {
    if (prop === 'child') {
      return () => fallbackLogger
    }

    if (typeof prop === 'string' && hasProp(mapToConsoleMethod, prop)) {
      const consoleMethod = Reflect.get(target, mapToConsoleMethod[prop], receiver)
      if (typeof consoleMethod === 'function') {
        return consoleMethod.bind(target)
      }
    }

    const value = Reflect.get(target, prop, receiver)
    if (typeof value === 'function') {
      return value.bind(target)
    }

    // 如果原生具有该属性（不为 undefined），则直接返回
    if (value !== undefined) {
      return value
    }

    // --- 核心改造点 D：未知的扩展属性/链式调用 ---
    // 比如 logger.bindings().xxx()，返回无限安全代理，杜绝 Cannot read properties of xxx 报错
    return noopProxy
  },

  // 拦截写入操作（如业务代码修改 logger.level = 'debug'）
  set(_target, _prop, _value) {
    // 静默吞掉修改操作，防止污染原生的 console 对象
    return true
  },
}) as unknown as AppLogger

let rootLogger: AppLogger | undefined

export const setRootLogger = (logger: AppLogger) => {
  rootLogger = logger
}

export const getLogger = (): AppLogger => {
  try {
    const contextLogger = getContext<AppEnv>().var.logger
    if (contextLogger) {
      return contextLogger
    }
  } catch {
    // outside hono context-storage
  }
  return rootLogger || fallbackLogger
}
