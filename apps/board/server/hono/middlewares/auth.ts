import { deleteCookie, getCookie } from 'hono/cookie'
import type { MiddlewareHandler } from 'hono'
import { jwtVerify, type JWTPayload } from 'jose'
import type { AuthSessionPayload } from '@newsnow/definition'
import type { AppEnv } from '@/hono/shared/app/types'
import { hasProp } from '@/hono/shared/utils'
import { E } from '@error-categories'

const sessionCookieName = (isLocal: boolean) =>
  isLocal ? 'newsnow_session' : '__Host-newsnow_session'
const isSessionProfile = (profile: unknown): profile is AuthSessionPayload['profile'] =>
  !!profile &&
  typeof profile === 'object' &&
  hasProp(profile, 'name') &&
  typeof profile.name === 'string' &&
  hasProp(profile, 'avatar') &&
  typeof profile.avatar === 'string'

const isAuthSessionPayload = (payload: JWTPayload): payload is JWTPayload & AuthSessionPayload =>
  typeof payload.id === 'string' && payload.type === 'github' && isSessionProfile(payload.profile)

const clearSession = (context: Parameters<MiddlewareHandler<AppEnv>>[0]) => {
  const isLocal = context.get('appConfig').runtime.isLocal
  deleteCookie(context, sessionCookieName(isLocal), {
    path: '/',
    secure: !isLocal,
    httpOnly: true,
    sameSite: 'Lax',
  })
}

export const optionalAuth: MiddlewareHandler<AppEnv> = async (context, next) => {
  const { appConfig } = context.var
  if (!appConfig.auth.jwtSecret) return next()
  const token = getCookie(context, sessionCookieName(appConfig.runtime.isLocal))
  if (!token) return next()
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(appConfig.auth.jwtSecret))
    if (!isAuthSessionPayload(payload)) throw new Error('Invalid session payload')
    context.set('session', payload)
  } catch {
    clearSession(context)
    context.get('logger')?.warn('Invalid session cookie')
  }
  await next()
}

export const requireAuth: MiddlewareHandler<AppEnv> = async (context, next) => {
  if (!context.get('session')) throw E.AUTH.REQUIRED.create()
  await next()
}

export { clearSession, sessionCookieName }
