import { problemDetailsHandler } from 'hono-problem-details'
import { E } from './defs'
import { logLevelFor } from './log'
import type { ErrorHandler } from 'hono'
import type { AppEnv } from '@/shared/app/types'
import { getLogger } from '@/infra/logger/getter'

const problemHandler = problemDetailsHandler({
  defaultType: E.NORMAL.INTERNAL.type,
})

export const globalErrorHandler: ErrorHandler<AppEnv> = (err, c) => {
  const logger = getLogger()
  logger[logLevelFor(err)](err)
  return problemHandler(err, c)
}
