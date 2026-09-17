import path from 'node:path'
import * as v from 'valibot'
import { defineSchemaConfig } from '../proto'
import { $S_NonEmptyString } from '../schema'

const workspaceRoot = path.join(import.meta.dirname, '../../..')
const defaultDbPath = path.join(workspaceRoot, 'db-data', 'newsnow.sqlite')

export const $S_SqliteSchemaConfig = v.object({
  dbPath: v.optional($S_NonEmptyString, defaultDbPath),
})
export type SqliteSchemaConfig = v.InferOutput<typeof $S_SqliteSchemaConfig>
export const sqliteSchemaConfig = defineSchemaConfig($S_SqliteSchemaConfig)
