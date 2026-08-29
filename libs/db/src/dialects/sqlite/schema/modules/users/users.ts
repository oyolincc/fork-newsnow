import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { UserSyncState } from '@newsnow/definition'
import { jsonColumn, modifiedTimeCols } from '@/dialects/sqlite/schema/columns'
import type { SelectVOResults } from '@/shared/types'
import { defineVO } from '@/shared/types'

export const users = sqliteTable('users', {
  /** 直接保存 GitHub 用户 ID；目前只有 GitHub 登录，不另存 provider/type 列。 */
  id: text('id').primaryKey(),
  /** GitHub 可能不返回邮箱，所以这个字段允许为空。 */
  email: text('email'),
  /**
   * 用户同步数据和版本号放在同一个 JSON 中。接口仍接收/返回 { data, updatedTime }；
   * 这里的 updatedTime 是客户端版本号，不是数据库行的更新时间。
   */
  syncState: jsonColumn<UserSyncState>('sync_state')
    .notNull()
    .default(sql`'{"data":{},"updatedTime":0}'`),
  /** 记录这行数据的创建时间和最后修改时间，由数据库/服务端维护。 */
  ...modifiedTimeCols(),
})

export type InsertUser = typeof users.$inferInsert

export const voUsers = defineVO({
  id: users.id,
  email: users.email,
  syncState: users.syncState,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
})
export type IUsersVO = SelectVOResults<typeof voUsers>

export const voUsersSyncState = defineVO({
  syncState: users.syncState,
})
export type IUsersSyncStateVO = SelectVOResults<typeof voUsersSyncState>

export const vcUsers = {
  default: voUsers,
  syncState: voUsersSyncState,
} as const
