import type { AnyColumn, GetColumnData, InferModelFromColumns, Table } from 'drizzle-orm'

export type AnyTableType = Table
export type AnyColType = AnyColumn

export type TableColsMap<T extends AnyTableType> = T['_']['columns']
export type TableField<T extends AnyTableType> = keyof TableColsMap<T> & string
export type TableFieldValue<T extends AnyTableType, K extends TableField<T>> = GetColumnData<
  TableColsMap<T>[K],
  'query'
>

export type VO<TColumn extends AnyColType = AnyColType> = Record<string, TColumn>
export type InsertModel<T extends AnyTableType> = InferModelFromColumns<TableColsMap<T>, 'insert'>

export function defineVO<T extends VO>(vo: T): T {
  return vo
}

export type SelectVOResults<V extends VO> = {
  [K in keyof V]: GetColumnData<V[K], 'query'>
}

export type VOColsOption<V extends VO> = {
  [K in keyof V]: true
}
