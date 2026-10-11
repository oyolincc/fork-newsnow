import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { csrf } from 'hono/csrf'
import { secureHeaders } from 'hono/secure-headers'
import { requestId } from 'hono/request-id'
import { corsMiddleware } from './middlewares/cors'
import { exampleRoutes } from './modules/example/routes'
import type { CreateAppOptions, AppEnv } from './shared/app/types'
import { E } from './shared/errors/defs'
import { globalErrorHandler } from './shared/errors/handler'
import { configureOpenAPI } from './shared/network/openapi'
import { objectEntries } from './shared/utils'

export const createApp = ({ serverBasePath, makeDependencies }: CreateAppOptions): Hono<AppEnv> => {
  const app = new Hono<AppEnv>().basePath(serverBasePath)

  app.use('*', async (c, next) => {
    const deps = await makeDependencies(c)
    objectEntries(deps).forEach(([key, value]) => c.set(key, value))
    await next()
  })
  app.use(contextStorage())
  app.use('*', requestId())
  app.use('*', async (c, next) => {
    const loggerHandler = c.get('loggerHandler')
    await loggerHandler(c as never, async () => {
      c.get('logger')?.assign({ reqId: c.get('requestId') })
      await next()
    })
  })
  app.use('*', secureHeaders())
  app.use('*', corsMiddleware())
  app.use('*', csrf())

  app.route('/', exampleRoutes)
  configureOpenAPI(app)

  app.notFound(() => {
    throw E.NORMAL.NOT_FOUND.create()
  })
  app.onError(globalErrorHandler)
  return app
}
