import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { relations, type SqliteDBType } from './schema'
import { ensureDatabaseDirectory } from './utils'

export type SqliteDatabase = SqliteDBType

export interface SqliteClient {
  db: SqliteDatabase
  close(): void
}

export function createSqliteClient(databaseFile: string): SqliteClient {
  if (!databaseFile) throw new Error('databaseFile must not be empty')

  ensureDatabaseDirectory(databaseFile)

  const client = new Database(databaseFile)
  client.pragma('foreign_keys = ON')
  if (databaseFile !== ':memory:') client.pragma('journal_mode = WAL')

  const db = drizzle({ client, relations })

  let closed = false

  return {
    db,
    close() {
      if (!closed) {
        client.close()
        closed = true
      }
    },
  }
}
