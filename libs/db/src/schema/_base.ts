import { sql } from 'drizzle-orm'
import { customType, timestamp } from 'drizzle-orm/pg-core'
import { type ColType, type VO } from '../types'

export function defineVO<V extends VO<ColType>>(vo: V): V {
  return vo
}

export const updatedAtCol = timestamp('updated_at', { withTimezone: true })
  .notNull()
  .default(sql`CURRENT_TIMESTAMP`)

export const modifiedTimeCols = {
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: updatedAtCol,
}

export const idType = customType<{ data: string; driverData: bigint }>({
  dataType() {
    return 'bigint'
  },
  fromDriver(value) {
    return String(value)
  },
})
