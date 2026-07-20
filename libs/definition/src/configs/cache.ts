import * as v from 'valibot'
import { createValibotConfigGetter } from '../utils/config-utils'

export const $S_CacheConfig = v.object({
  enableCache: v.pipe(
    v.optional(v.string(), 'true'),
    v.transform((value) => value !== 'false'),
  ),
})
export type CacheConfig = v.InferOutput<typeof $S_CacheConfig>
export const needCacheConfig = createValibotConfigGetter($S_CacheConfig)

// function parseBoolean(value: string | undefined, defaultValue: boolean) {
//   if (value === undefined) return defaultValue
//   return value !== 'false'
// }

// export function cacheConfig() {
//   const env = createEnv({
//     server: {
//       ENABLE_CACHE: v.optional(v.string()),
//     },
//     runtimeEnv: process.env,
//     emptyStringAsUndefined: true,
//   })
//
//   return {
//     enableCache: parseBoolean(env.ENABLE_CACHE, true),
//   }
// }
