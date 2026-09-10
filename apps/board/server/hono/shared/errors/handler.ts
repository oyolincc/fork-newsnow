import type { Context } from 'hono'
import { problemDetailsHandler } from 'hono-problem-details'
import type { HTTPResponseError } from 'hono/types'
import type { AppEnv } from '@/hono/shared/app/types'
import { getLogger } from '@/hono/infra/logger/getter'
import { E } from './defs'
import { logLevelFor } from './log'

const problemHandler = problemDetailsHandler({
  defaultType: E.NORMAL.INTERNAL.type,
})

export const globalErrorHandler = (err: Error | HTTPResponseError, c: Context<AppEnv>) => {
  const logger = getLogger()
  logger[logLevelFor(err)](err)
  return problemHandler(err, c)
}
