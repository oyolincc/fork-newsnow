import * as v from 'valibot'
import { defineSchemaConfig } from '../proto'
import { $S_NonEmptyString } from '../schema'

export const $S_SqliteSchemaConfig = v.object({
  dbPath: v.optional($S_NonEmptyString, './data/newsnow.sqlite'),
})
export type SqliteSchemaConfig = v.InferOutput<typeof $S_SqliteSchemaConfig>
export const sqliteSchemaConfig = defineSchemaConfig($S_SqliteSchemaConfig)
