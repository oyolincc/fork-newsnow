import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'
import { contextStorage } from 'hono/context-storage'
import type { Context } from 'hono'
import type { AppDependencies, AppEnv } from './shared/app/types'
import { objectEntries } from './shared/utils'
import { optionalAuth } from './middlewares/auth'
import { authRoutes } from './modules/auth/routes'
import { sourceRoutes } from './modules/sources/routes'
import { userRoutes } from './modules/users/routes'
import { configureOpenAPI } from './shared/network/utils'
import { globalErrorHandler } from './shared/errors/handler'
import { E } from './shared/errors/defs'

export const createApp = (
  makeDependencies: (context: Context<AppEnv>) => Promise<AppDependencies> | AppDependencies,
) => {
  const app = new Hono<AppEnv>()
  app.use('*', async (context, next) => {
    for (const [key, value] of objectEntries(await makeDependencies(context)))
      context.set(key, value)
    await next()
  })
  app.use('*', contextStorage())
  app.use('*', requestId())
  app.use('*', async (context, next) => {
    const loggerHandler = context.get('loggerHandler')
    await loggerHandler(context as any, next)
  })
  app.use('*', secureHeaders())
  app.use('*', csrf())
  // TODO: 当前 API 与 board 同源且不启用 CORS；出现真实跨域 consumer 时在此增加显式 allowlist，并联合 credentials 与 CSRF 设计，禁止恢复 origin: '*'.
  app.use('*', optionalAuth)
  app.route('/api/auth', authRoutes)
  app.route('/api/source', sourceRoutes)
  app.route('/api/user', userRoutes)

  configureOpenAPI(app)

  app.notFound(() => {
    throw E.NORMAL.NOT_FOUND.create()
  })
  app.onError(globalErrorHandler)
  return app
}
