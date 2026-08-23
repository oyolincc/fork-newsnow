import * as v from 'valibot'
import { defineSchemaConfig } from '../proto'

export const $S_RuntimeConfig = v.object({
  serverEnv: v.optional(
    v.union([v.literal('local'), v.literal('test'), v.literal('staging'), v.literal('main')]),
    'local',
  ),
})
export type RuntimeConfig = v.InferOutput<typeof $S_RuntimeConfig>
export const runtimeConfig = defineSchemaConfig($S_RuntimeConfig)
