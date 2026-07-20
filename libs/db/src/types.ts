import { type AnyPgColumn, type AnyPgTable } from 'drizzle-orm/pg-core'
import { type PgDBType } from './client'
import { type InferModelFromColumns, type GetColumnData } from 'drizzle-orm'

// import * as Schemas from './schema/tables'
// export type TableType = typeof Schemas extends Record<string, infer U> ? U : never

export type DBType = PgDBType
export type TableType = AnyPgTable
export type ColType = AnyPgColumn

export type TableColsMap<T extends TableType> = T['_']['columns']
export type TableField<T extends TableType> = keyof TableColsMap<T> & string
export type TableFieldValue<T extends TableType, K extends TableField<T>> = GetColumnData<
  T['_']['columns'][K],
  'query'
>
export type VO<TColumn extends ColType = ColType> = Record<string, TColumn>
export type InsertModel<T extends TableType> = InferModelFromColumns<TableColsMap<T>, 'insert'>
export type SelectVOResults<V extends VO> =
  V extends Record<infer K, ColType> ? { [key in K]: GetColumnData<V[key], 'query'> } : never

export type VOColsOption<V extends VO> =
  V extends Record<infer K, ColType> ? { [key in K]: true } : never
