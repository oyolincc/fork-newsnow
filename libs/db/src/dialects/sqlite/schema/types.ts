import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import type { AnySQLiteColumn, AnySQLiteTable } from 'drizzle-orm/sqlite-core'
import type { relations } from './relations'

export type SqliteDBType = BetterSQLite3Database<typeof relations>
export type SqliteTableType = AnySQLiteTable
export type SqliteColType = AnySQLiteColumn
