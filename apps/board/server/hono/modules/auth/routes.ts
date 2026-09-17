import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { describeRoute } from 'hono-openapi'
import { base64url, SignJWT } from 'jose'
import type { AppEnv } from '@/hono/shared/app/types'
import { successJson, OpenApiTags } from '@/hono/shared/network/utils'
import { E } from '@error-categories'
import { clearSession } from '@/hono/middlewares/auth'
import { finishGitHubLogin } from './resolvers/github-callback'
import type { OAuthTransaction } from './types'

const transactionCookie = 'newsnow_github_oauth'
const random = () => base64url.encode(crypto.getRandomValues(new Uint8Array(32)))
const createCodeChallenge = async (verifier: string) =>
  base64url.encode(
    new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))),
  )

export const authRoutes = new Hono<AppEnv>()
  .get(
    '/github/status',
    describeRoute({
      tags: [OpenApiTags.Auth],
      summary: 'GitHub 登录配置状态',
      responses: { 200: { description: '状态' } },
    }),
    (context) => successJson(context, { enabled: !!context.get('appConfig').auth.jwtSecret }),
  )
  .get(
    '/github/login',
    describeRoute({
      tags: [OpenApiTags.Auth],
      summary: '跳转 GitHub 登录',
      responses: { 302: { description: 'OAuth redirect' } },
    }),
    async (context) => {
      const { auth, runtime } = context.get('appConfig')
      if (!auth.githubClientId || !auth.githubCallbackUrl || !auth.jwtSecret)
        throw E.AUTH.DISABLED.create()
      const state = random()
      const verifier = random()
      const transaction: OAuthTransaction = {
        state,
        verifier,
        expiresAt: Date.now() + auth.oauthTransactionTtlSeconds * 1000,
      }
      const signed = await new SignJWT(transaction)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(`${auth.oauthTransactionTtlSeconds}s`)
        .sign(new TextEncoder().encode(auth.jwtSecret))
      setCookie(context, transactionCookie, signed, {
        path: '/api/auth/github/callback',
        httpOnly: true,
        secure: !runtime.isLocal,
        sameSite: 'Lax',
        maxAge: auth.oauthTransactionTtlSeconds,
      })
      const authorizeUrl = new URL(auth.githubAuthorizeUrl)
      authorizeUrl.search = new URLSearchParams({
        client_id: auth.githubClientId,
        redirect_uri: auth.githubCallbackUrl,
        state,
        code_challenge: await createCodeChallenge(verifier),
        code_challenge_method: 'S256',
      }).toString()
      return context.redirect(authorizeUrl.toString())
    },
  )
  .get(
    '/github/callback',
    describeRoute({
      tags: [OpenApiTags.Auth],
      summary: '完成 GitHub 登录',
      responses: { 302: { description: '站内 redirect' } },
    }),
    async (context) => {
      const { auth, runtime } = context.get('appConfig')
      const code = context.req.query('code')
      const state = context.req.query('state')
      const signed = getCookie(context, transactionCookie)
      deleteCookie(context, transactionCookie, {
        path: '/api/auth/github/callback',
        httpOnly: true,
        secure: !runtime.isLocal,
        sameSite: 'Lax',
      })
      if (context.req.query('error') || !code || !state || !signed || !auth.jwtSecret)
        throw E.AUTH.OAUTH.create()
      const { jwtVerify } = await import('jose')
      let transaction: OAuthTransaction
      try {
        transaction = (await jwtVerify(signed, new TextEncoder().encode(auth.jwtSecret)))
          .payload as OAuthTransaction
      } catch {
        throw E.AUTH.OAUTH.create()
      }
      if (transaction.state !== state || transaction.expiresAt < Date.now())
        throw E.AUTH.OAUTH.create()
      await finishGitHubLogin(context, transaction, code)
      // official 曾在 redirect query 传 JWT/user；本实现刻意使用 HttpOnly Cookie，避免泄露到 history、Referer 和日志。
      const redirect = new URL(auth.successRedirectPath, context.req.url)
      redirect.searchParams.set('login', 'github')
      return context.redirect(redirect.toString())
    },
  )
  .post(
    '/logout',
    describeRoute({
      tags: [OpenApiTags.Auth],
      summary: '退出登录',
      responses: { 200: { description: '已退出' } },
    }),
    (context) => {
      clearSession(context)
      return successJson(context, { loggedOut: true })
    },
  )
