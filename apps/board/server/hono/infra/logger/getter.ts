import { getContext } from 'hono/context-storage'
import type { AppEnv, AppLogger } from '@/hono/shared/app/types'
import { hasProp } from '@/hono/shared/utils'

const dummyFn = () => noopProxy
const noopProxy: any = new Proxy(dummyFn, {
  get: () => noopProxy,
  apply: () => noopProxy,
})

const mapToConsoleMethod: Record<string, string> = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
  fatal: 'error',
  silent: 'debug',
}

export const fallbackLogger = new Proxy(console, {
  get(target, prop, receiver) {
    if (prop === 'child') return () => fallbackLogger

    if (typeof prop === 'string' && hasProp(mapToConsoleMethod, prop)) {
      const consoleMethod = Reflect.get(target, mapToConsoleMethod[prop], receiver)
      if (typeof consoleMethod === 'function') return consoleMethod.bind(target)
    }

    const value = Reflect.get(target, prop, receiver)
    if (typeof value === 'function') return value.bind(target)
    if (value !== undefined) return value
    return noopProxy
  },
  set() {
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
    if (contextLogger) return contextLogger
  } catch {
    // outside hono context-storage
  }
  return rootLogger || fallbackLogger
}
