import * as v from 'valibot'
import { defineSchemaConfig } from '../proto'

export const $S_CORSConfig = v.object({
  domains: v.pipe(
    v.optional(v.string()),
    v.transform((val) =>
      String(val || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ) as v.GenericSchema<string | undefined, string[]>,
})
export type CORSConfig = v.InferOutput<typeof $S_CORSConfig>
export const corsConfig = defineSchemaConfig($S_CORSConfig)
