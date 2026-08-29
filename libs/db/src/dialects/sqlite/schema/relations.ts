import { defineRelations } from 'drizzle-orm'
import { sqliteTableDefs } from './tables'

/** 目前 users 和 source_snapshots 互相独立，没有外键；保留这个入口方便以后补充真实关联。 */
export const relations = defineRelations(sqliteTableDefs)
