import { defineRelations } from 'drizzle-orm'
import { sqliteTableDefs } from './tables'

/** The example table has no relationships; keep the relations entrypoint for future modules. */
export const relations = defineRelations(sqliteTableDefs)
