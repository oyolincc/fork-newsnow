import { createSqliteClient } from '@newsnow/db/sqlite/sqlite'
import { getRuntimeKey } from 'hono/adapter'
import { createApp } from '@/hono/app'
import { createPinoLogger } from '@/hono/infra/logger/pino'
import { getLogger, setRootLogger } from '@/hono/infra/logger/getter'
import { createFetcher } from '@/hono/shared/network/fetcher'
import type { AppDependencies, AppLogger } from '@/hono/shared/app/types'
import { resolveConfig } from './config'

function installProcessErrorHandlers(isLocal: boolean) {
  process.on('unhandledRejection', (reason) => {
    getLogger().error({ err: reason }, 'unhandledRejection')
    if (isLocal) process.exit(1)
  })

  process.on('uncaughtException', (err) => {
    getLogger().fatal({ err }, 'uncaughtException')
    process.exit(1)
  })
}

const appConfig = resolveConfig(process.env)
const { runtime, log } = appConfig
const { rootLogger, loggerHandler } = createPinoLogger({
  isLocal: runtime.isLocal,
  runtime: getRuntimeKey(),
  logPretty: log.pretty,
  logRoll: log.roll,
})
setRootLogger(rootLogger as unknown as AppLogger)
installProcessErrorHandlers(runtime.isLocal)

export const sqliteClient = createSqliteClient(appConfig.sqlite.dbPath)

// TODO: official 还支持 CF Pages、Bun、Vercel Edge；本期只有 Node composition root。
// 未来应新增与 nodejs 平级 adapter 并各自组装依赖，不能把 runtime 判断散落到业务模块。
// TODO: official 曾通过 CF proxy/NewsNow 回源；本期 Node 直接请求上游。未来在此作为显式、可注入的 fetcher policy 接入，禁止 adapter 硬编码代理域名。
const sourceFetcher = createFetcher({
  timeout: appConfig.http.timeout,
  retry: appConfig.http.retry,
  headers: { 'user-agent': appConfig.http.userAgent },
})
const githubFetcher = createFetcher({
  timeout: appConfig.http.timeout,
  retry: 0,
  headers: { accept: 'application/json', 'user-agent': appConfig.http.userAgent },
})
let dependencies: AppDependencies | undefined

export default createApp(() => {
  dependencies ||= {
    appConfig,
    loggerHandler,
    db: sqliteClient.db,
    sourceFetcher,
    githubFetcher,
  }
  return dependencies
})
