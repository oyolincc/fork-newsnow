import * as v from 'valibot'
import { createValibotConfigGetter } from '../utils/config-utils'

export const sqliteRuntimes = ['node', 'd1'] as const
export type SqliteRuntime = (typeof sqliteRuntimes)[number]

export const $S_SqliteConfig = v.object({
  sqliteFile: v.optional(v.string(), 'db/newsnow.db'),
  sqliteRuntime: v.optional(v.picklist(sqliteRuntimes), 'node'),
  d1BindingName: v.optional(v.string(), 'NEWSNOW_DB'),
})

export type SqliteConfig = v.InferOutput<typeof $S_SqliteConfig>

export const needSqliteConfig = createValibotConfigGetter($S_SqliteConfig)

// function parseRuntime(value: string | undefined): SqliteRuntime {
//   return runtimeValues.includes(value as SqliteRuntime) ? (value as SqliteRuntime) : 'node'
// }

// export function sqliteConfig() {
//   const env = createEnv({
//     server: {
//       SQLITE_FILE: v.optional(v.string(), '.data/newsnow.sqlite'),
//       SQLITE_RUNTIME: v.optional(v.string()),
//       D1_BINDING_NAME: v.optional(v.string(), 'NEWSNOW_DB'),
//     },
//     runtimeEnv: process.env,
//     emptyStringAsUndefined: true,
//   })
//
//   return {
//     sqliteFile: env.SQLITE_FILE,
//     sqliteRuntime: parseRuntime(env.SQLITE_RUNTIME),
//     d1BindingName: env.D1_BINDING_NAME,
//   }
// }
