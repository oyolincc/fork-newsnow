import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { autoIncrementId, modifiedTimeCols } from '../../columns'
import type { SelectVOResults } from '@/shared/types'
import { defineVO } from '@/shared/types'

export const examples = sqliteTable('examples', {
  id: autoIncrementId('id'),
  message: text('message').notNull(),
  ...modifiedTimeCols(),
})

export type InsertExample = typeof examples.$inferInsert

export const voExamples = defineVO({
  id: examples.id,
  message: examples.message,
  createdAt: examples.createdAt,
  updatedAt: examples.updatedAt,
})
export type IExamplesVO = SelectVOResults<typeof voExamples>

export const vcExamples = { default: voExamples } as const
