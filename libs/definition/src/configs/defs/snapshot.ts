import * as v from 'valibot'
import { defineSchemaConfig } from '../proto'
import { $S_BooleanString, $S_NumberString } from '../schema'

export const $S_SnapshotSchemaConfig = v.object({
  // 是否启用 SQLite 新闻快照缓存；读取 SNAPSHOT_ENABLED，关闭后每次请求直接抓取上游。
  enabled: $S_BooleanString,
  // 快照可直接返回的最长缓存时间，单位为毫秒；读取 SNAPSHOT_TTL_MS，过期后会尝试重新抓取。
  ttlMs: $S_NumberString(30 * 60 * 1000),
  // 单个新闻源写入快照时最多保留的新闻条数；读取 SNAPSHOT_LIMIT_COUNT，0 表示不保存任何条目。
  limitCount: $S_NumberString(30),
})
export type SnapshotSchemaConfig = v.InferOutput<typeof $S_SnapshotSchemaConfig>
export const snapshotSchemaConfig = defineSchemaConfig($S_SnapshotSchemaConfig)
