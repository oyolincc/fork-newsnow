import path from 'node:path'
import { defineConfig } from 'drizzle-kit'
import { ensureDatabaseDirectory } from '../src/dialects/sqlite/utils'
import { sqliteSchemaConfig } from '@newsnow/definition/backend'

const configDir = import.meta.dirname

const { dbPath } = sqliteSchemaConfig.resolve({
  context: process.env,
  matchContextKey: 'constantCase',
})

ensureDatabaseDirectory(dbPath)

export default defineConfig({
  dialect: 'sqlite',
  schema: path.join(configDir, '../src/dialects/sqlite/schema/tables.ts'),
  out: path.join(configDir, '../migrations/sqlite'),
  dbCredentials: {
    url: dbPath,
  },
})
