import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { databaseUrl } from './config'
import { Pool, type PoolConfig } from 'pg'
import { relations } from './schema/relations'

export type PgDBType = NodePgDatabase<typeof relations>

export function createDrizzleClient(options: PoolConfig): PgDBType {
  const pool = new Pool({
    connectionString: databaseUrl,
    ...options,
  })
  const db = drizzle({
    client: pool,
    relations,
  })
  return db
}
