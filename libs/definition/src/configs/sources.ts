import * as v from 'valibot'
import { createValibotConfigGetter } from '../utils/config-utils'

export const $S_SourceConfig = v.object({
  producthuntApiToken: v.optional(v.string()),
})
export type SourceConfig = v.InferOutput<typeof $S_SourceConfig>
export const needSourceConfig = createValibotConfigGetter($S_SourceConfig)

// export function sourceConfig() {
//   return createEnv({
//     server: {
//       PRODUCTHUNT_API_TOKEN: v.optional(v.string()),
//     },
//     runtimeEnv: process.env,
//     emptyStringAsUndefined: true,
//   })
// }
