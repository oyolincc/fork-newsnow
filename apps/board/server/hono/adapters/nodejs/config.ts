import {
  authRawConfig,
  authSchemaConfig,
  httpConfig,
  logPrettyRawConfig,
  logRollRawConfig,
  logRollSchemaConfig,
  runtimeConfig,
  snapshotSchemaConfig,
  sqliteSchemaConfig,
  thirdPartySchemaConfig,
} from '@newsnow/definition/backend'
import { flatten, isValiError } from 'valibot'
import type { AppConfig } from '@/hono/shared/app/types'

export function resolveConfig(context: Record<string, unknown>): AppConfig {
  try {
    const fromEnv = { context, matchContextKey: 'constantCase' as const }
    const runtime = runtimeConfig.resolve(fromEnv)
    const snapshot = snapshotSchemaConfig.resolve({
      context: {
        enabled: context.SNAPSHOT_ENABLED,
        ttlMs: context.SNAPSHOT_TTL_MS,
        limitCount: context.SNAPSHOT_LIMIT_COUNT,
      },
      matchContextKey: 'camel',
    })
    return {
      runtime: {
        ...runtime,
        isLocal: runtime.serverEnv === 'local',
      },
      log: {
        roll: {
          ...logRollSchemaConfig.resolve(fromEnv),
          ...logRollRawConfig.resolve(),
        },
        pretty: logPrettyRawConfig.resolve(),
      },
      auth: {
        ...authSchemaConfig.resolve(fromEnv),
        ...authRawConfig.resolve(),
      },
      snapshot,
      http: httpConfig.resolve(),
      thirdParty: thirdPartySchemaConfig.resolve(fromEnv),
      sqlite: sqliteSchemaConfig.resolve(fromEnv),
    }
  } catch (error) {
    if (isValiError(error))
      throw new Error(`[resolveAppConfig] ${JSON.stringify(flatten(error.issues))}`, {
        cause: error,
      })
    throw error
  }
}
