import type { AppEnv } from '@/shared/app/types'
import { cors } from 'hono/cors'
import { createMiddleware } from 'hono/factory'

export const corsMiddleware = () => {
  return createMiddleware<AppEnv>(async (c, next) => {
    const corsConfig = c.get('appConfig')
    const domains = corsConfig.middleware.cors.domains
    const middleware = cors({
      origin: (origin) => {
        const isAllowedDomain = domains.some((domain) => {
          try {
            return domain === '*' || new URL(origin).host === domain
          } catch {
            return false
          }
        })
        return isAllowedDomain ? origin : null
      },
      allowHeaders: ['Content-Type'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    })
    return middleware(c, next)
  })
}
