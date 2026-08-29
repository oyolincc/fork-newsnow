import * as v from 'valibot'
import { defineSchemaConfig } from '../proto'
import { $S_BooleanString } from '../schema'

export const $S_SnapshotSchemaConfig = v.object({
  /** 环境变量名沿用 official 的 ENABLE_CACHE；新实现里它控制是否读写 source snapshot。 */
  enabled: $S_BooleanString,
  ttlMs: v.optional(v.pipe(v.number(), v.minValue(0)), 30 * 60 * 1000),
  maxItems: v.optional(v.pipe(v.number(), v.minValue(0)), 30),
})
export type SnapshotSchemaConfig = v.InferOutput<typeof $S_SnapshotSchemaConfig>
export const snapshotSchemaConfig = defineSchemaConfig($S_SnapshotSchemaConfig)
