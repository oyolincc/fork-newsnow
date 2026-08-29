import { sql } from 'drizzle-orm'
import { customType, integer, text } from 'drizzle-orm/sqlite-core'

export const idType = customType<{ data: string; driverData: number | bigint }>({
  dataType() {
    return 'integer'
  },
  fromDriver(value) {
    return String(value)
  },
})

export function timestampMsColumn(name: string) {
  return integer(name, { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch('subsec') * 1000)`)
}

export const updatedAtCol = () => timestampMsColumn('updated_at').$onUpdateFn(() => new Date())

/**
 * createdAt 和 updatedAt 是数据库行的创建/修改时间，SQLite 保存毫秒时间戳，代码里使用 Date。
 * syncState.updatedTime 是客户端同步版本号，和这两个时间不是一回事，不要混用。
 */
export const modifiedTimeCols = () => ({
  createdAt: timestampMsColumn('created_at'),
  updatedAt: updatedAtCol(),
})

export function jsonColumn<T>(name: string) {
  return text(name, { mode: 'json' }).$type<T>()
}
