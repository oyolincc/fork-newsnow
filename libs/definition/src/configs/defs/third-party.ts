import * as v from 'valibot'
import { defineSchemaConfig } from '../proto'

export const $S_ThirdPartySchemaConfig = v.object({
  producthuntApiToken: v.optional(v.pipe(v.string(), v.transform(value => value || undefined))),
})
export type ThirdPartySchemaConfig = v.InferOutput<typeof $S_ThirdPartySchemaConfig>
export const thirdPartySchemaConfig = defineSchemaConfig($S_ThirdPartySchemaConfig)
