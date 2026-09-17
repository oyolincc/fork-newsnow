import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { NewsItem, SourceID } from '@newsnow/definition/backend'
import { jsonColumn, updatedAtCol } from '@/dialects/sqlite/schema/columns'
import type { SelectVOResults } from '@/shared/types'
import { defineVO } from '@/shared/types'

export const sourceSnapshots = sqliteTable('source_snapshots', {
  /** 用新闻源 id（例如 v2ex）作为主键；每个 source 只保留一份最新抓取结果。 */
  id: text('id').$type<SourceID>().primaryKey(),
  /** 保存这个 source 最近一次抓到的完整新闻列表，读取时一次取出，不拆成单条新闻表。 */
  items: jsonColumn<NewsItem[]>('items').notNull(),
  /** 记录这份快照最后写入数据库的时间，只用于判断快照是否过期。 */
  updatedAt: updatedAtCol(),
})

export type InsertSourceSnapshot = typeof sourceSnapshots.$inferInsert

export const voSourceSnapshots = defineVO({
  id: sourceSnapshots.id,
  items: sourceSnapshots.items,
  updatedAt: sourceSnapshots.updatedAt,
})
export type ISourceSnapshotsVO = SelectVOResults<typeof voSourceSnapshots>

export const vcSourceSnapshots = {
  default: voSourceSnapshots,
} as const
