import { setCookie } from 'hono/cookie'
import { SignJWT } from 'jose'
import { users } from '@newsnow/db/sqlite/schema'
import type { Context } from 'hono'
import type { AuthSessionPayload } from '@newsnow/definition'
import type { AppEnv } from '@/hono/shared/app/types'
import { getGitHubToken, getGitHubUser } from '@/hono/upstream/github/api'
import type { OAuthTransaction } from '@/hono/modules/auth/types'
import { E } from '@error-categories'
import { sessionCookieName } from '@/hono/middlewares/auth'

export async function finishGitHubLogin(
  context: Context<AppEnv>,
  transaction: OAuthTransaction,
  code: string,
) {
  const { appConfig, db, githubFetcher } = context.var
  const { githubClientId, githubClientSecret, githubCallbackUrl, jwtSecret } = appConfig.auth
  if (!githubClientId || !githubClientSecret || !githubCallbackUrl || !jwtSecret)
    throw E.AUTH.DISABLED.create()
  const token = await getGitHubToken(
    githubFetcher,
    appConfig.auth.githubAccessTokenUrl,
    new URLSearchParams({
      client_id: githubClientId,
      client_secret: githubClientSecret,
      redirect_uri: githubCallbackUrl,
      code,
      code_verifier: transaction.verifier,
    }),
  )
  if (!token.access_token) throw E.AUTH.OAUTH.create()
  const githubUser = await getGitHubUser(
    githubFetcher,
    appConfig.auth.githubUserUrl,
    token.access_token,
  )
  const id = String(githubUser.id)
  await db
    .insert(users)
    .values({ id, email: githubUser.email })
    .onConflictDoUpdate({
      target: users.id,
      set: { email: githubUser.email, updatedAt: new Date() },
    })
  const session: AuthSessionPayload = {
    id,
    type: 'github',
    profile: { name: githubUser.login, avatar: githubUser.avatar_url },
  }
  const jwt = await new SignJWT({ id: session.id, type: session.type, profile: session.profile })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(appConfig.auth.jwtExpiresIn)
    .sign(new TextEncoder().encode(jwtSecret))
  const isLocal = appConfig.runtime.isLocal
  setCookie(context, sessionCookieName(isLocal), jwt, {
    path: '/',
    httpOnly: true,
    secure: !isLocal,
    sameSite: 'Lax',
    maxAge: 60 * 24 * 60 * 60,
  })
}
