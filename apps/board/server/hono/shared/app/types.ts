import type { SqliteDatabase } from '@newsnow/db/sqlite/sqlite'
import type {
  AuthSchemaConfig,
  LogPrettyRawConfig,
  LogRollRawConfig,
  LogRollSchemaConfig,
  RuntimeConfig,
  SessionUser,
  SnapshotSchemaConfig,
  SqliteSchemaConfig,
  ThirdPartySchemaConfig,
} from '@newsnow/definition/backend'
import type { MiddlewareHandler } from 'hono'
import type { RequestIdVariables } from 'hono/request-id'
import type { PinoLogger } from 'hono-pino'
import type { KyInstance } from 'ky'

export type PinoLikeLogger = PinoLogger
export type AppLogger = PinoLikeLogger
export type AppFetcher = KyInstance

export type AppConfig = {
  runtime: RuntimeConfig & { isLocal: boolean }
  log: { roll: LogRollSchemaConfig & LogRollRawConfig; pretty: LogPrettyRawConfig }
  auth: AuthSchemaConfig & {
    githubAuthorizeUrl: string
    githubAccessTokenUrl: string
    githubUserUrl: string
    jwtAlgorithm: 'HS256'
    jwtExpiresIn: string
    oauthTransactionTtlSeconds: number
    successRedirectPath: string
  }
  snapshot: SnapshotSchemaConfig
  http: { userAgent: string; timeout: number; retry: number }
  thirdParty: ThirdPartySchemaConfig
  sqlite: SqliteSchemaConfig
}

export type AppDependencies = {
  appConfig: AppConfig
  loggerHandler: MiddlewareHandler<{ Variables: { logger: AppLogger } }>
  db: SqliteDatabase
  sourceFetcher: AppFetcher
  githubFetcher: AppFetcher
}

export type AppEnv = {
  Variables: RequestIdVariables & AppDependencies & { logger?: AppLogger; session?: SessionUser }
}
