import * as v from 'valibot'
import { defineSchemaConfig, defineStaticConfig } from '../proto'

export const $S_LogRollSchemaConfig = v.object({
  loggerDir: v.optional(v.string(), './logs'),
  loggerFileBase: v.optional(
    v.pipe(v.string(), v.minLength(1, 'loggerFileBase must be at least 1 character long')),
    'app',
  ),
})
export type LogRollSchemaConfig = v.InferOutput<typeof $S_LogRollSchemaConfig>
export const logRollSchemaConfig = defineSchemaConfig($S_LogRollSchemaConfig)

// https://github.com/mcollina/pino-roll#options
export interface LogRollRawConfig {
  frequency: number | string
  extension: string
  size: number | string
  maxFiles: number
  mkdir: boolean
  dateFormat: string
}
export const logRollRawConfig = defineStaticConfig<LogRollRawConfig>(() => ({
  frequency: 'daily' as const,
  extension: '.log',
  size: '10M',
  maxFiles: 30,
  mkdir: true,
  dateFormat: 'yyyy-MM-dd',
}))

export interface LogPrettyRawConfig {
  colorize: boolean
  singleLine: boolean
  levelFirst: boolean
  translateTime: string
  ignore: string
}
export const logPrettyRawConfig = defineStaticConfig<LogPrettyRawConfig>(() => ({
  colorize: true,
  singleLine: true,
  levelFirst: true,
  translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
  ignore: 'pid,hostname',
}))
