import * as v from 'valibot'
import { createValibotConfigGetter } from '../utils/config-utils'

export const $S_AuthConfig = v.object({
  githubClientId: v.optional(v.string()),
  githubClientSecret: v.optional(v.string()),
  jwtSecret: v.optional(v.string()),
})
export type AuthConfig = v.InferOutput<typeof $S_AuthConfig>
export const needAuthConfig = createValibotConfigGetter($S_AuthConfig)

// export function isAuthEnabled(config = authConfig()) {
//   return Boolean(config.GITHUB_CLIENT_ID && config.GITHUB_CLIENT_SECRET && config.JWT_SECRET)
// }
