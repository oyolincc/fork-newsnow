import path from 'node:path'
import { defineConfig } from 'drizzle-kit'
import { ensureDatabaseDirectory } from './utils'
import { sqliteSchemaConfig } from '@newsnow/definition'

const configDir = import.meta.dirname

const { dbPath } = sqliteSchemaConfig.resolve({
  context: process.env,
  matchContextKey: 'constantCase',
})

ensureDatabaseDirectory(dbPath)

export default defineConfig({
  dialect: 'sqlite',
  schema: path.join(configDir, 'schema/tables.ts'),
  out: path.join(configDir, '../../../migrations/sqlite'),
  dbCredentials: {
    url: dbPath,
  },
})
