import { drizzle, type AnyD1Database } from 'drizzle-orm/d1'
import { relations } from './schema'

export type D1Binding = AnyD1Database

export function createD1Client(database: D1Binding) {
  if (!database) throw new Error('database must not be empty')

  const db = drizzle(database, { relations })

  return { db }
}
