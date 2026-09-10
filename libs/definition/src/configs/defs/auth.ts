import * as v from 'valibot'
import { defineSchemaConfig, defineStaticConfig } from '../proto'
import { $S_NonEmptyString } from '../schema'

export const $S_AuthSchemaConfig = v.pipe(
  v.object({
    githubClientId: v.optional($S_NonEmptyString),
    githubClientSecret: v.optional($S_NonEmptyString),
    githubCallbackUrl: v.optional(v.pipe(v.string(), v.url())),
    jwtSecret: v.optional(v.pipe(v.string(), v.minLength(32))),
  }),
  v.check(
    ({ githubClientId, githubClientSecret, githubCallbackUrl, jwtSecret }) =>
      [githubClientId, githubClientSecret, githubCallbackUrl, jwtSecret].every((value) => !value) ||
      [githubClientId, githubClientSecret, githubCallbackUrl, jwtSecret].every(Boolean),
    'GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL and JWT_SECRET must be provided together',
  ),
)
export type AuthSchemaConfig = v.InferOutput<typeof $S_AuthSchemaConfig>
export const authSchemaConfig = defineSchemaConfig($S_AuthSchemaConfig)

export const authRawConfig = defineStaticConfig(() => ({
  githubAuthorizeUrl: 'https://github.com/login/oauth/authorize',
  githubAccessTokenUrl: 'https://github.com/login/oauth/access_token',
  githubUserUrl: 'https://api.github.com/user',
  jwtAlgorithm: 'HS256' as const,
  jwtExpiresIn: '60d' as const,
  oauthTransactionTtlSeconds: 10 * 60,
  successRedirectPath: '/',
}))
