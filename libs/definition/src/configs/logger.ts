import * as v from 'valibot'
import { createValibotConfigGetter } from '../utils/config-utils'

export const logLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const
export type LogLevel = (typeof logLevels)[number]

export const $S_LoggerConfig = v.object({
  level: v.optional(v.picklist(logLevels), 'info'),
  pretty: v.pipe(
    v.optional(v.string(), 'false'),
    v.transform((value) => value === 'true'),
  ),
})
export type LoggerConfig = v.InferOutput<typeof $S_LoggerConfig>
export const needLoggerConfig = createValibotConfigGetter($S_LoggerConfig)

// function parseLevel(value: string | undefined): LogLevel {
//   return levels.includes(value as LogLevel) ? (value as LogLevel) : 'info'
// }

// function parseBoolean(value: string | undefined, defaultValue: boolean) {
//   if (value === undefined) return defaultValue
//   return value === 'true'
// }

// export function loggerConfig() {
//   const env = createEnv({
//     server: {
//       LOG_LEVEL: v.optional(v.string()),
//       LOG_PRETTY: v.optional(v.string()),
//     },
//     runtimeEnv: process.env,
//     emptyStringAsUndefined: true,
//   })
//
//   return {
//     level: parseLevel(env.LOG_LEVEL),
//     pretty: parseBoolean(env.LOG_PRETTY, process.env.NODE_ENV !== 'production'),
//   }
// }
