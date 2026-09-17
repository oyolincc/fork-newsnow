import { eq } from 'drizzle-orm'
import { sourceSnapshots, vcSourceSnapshots } from '@newsnow/db/sqlite/schema'
import { SourceOrigin, sourceCatalog, type NewsItem, type SourceID } from '@newsnow/definition/backend'
import type { Context } from 'hono'
import type { AppEnv } from '@/hono/shared/app/types'
import { E } from '@error-categories'
import { resolveSourceId, sourceRegistry } from '@/hono/modules/sources/registry'
import type { SourceResult } from '@/hono/modules/sources/types'

const inFlight = new Map<SourceID, Promise<SourceResult>>()

export async function getSourceItems(
  context: Context<AppEnv>,
  requestedId: string,
  refresh: boolean,
): Promise<SourceResult> {
  const sourceId = resolveSourceId(requestedId)
  if (!sourceId) throw E.SOURCE.NOT_FOUND.create()
  const { appConfig, db } = context.var
  const adapter = sourceRegistry[sourceId]
  if (!adapter) throw E.SOURCE.FETCH_FAILED.create({ detail: '该新闻源尚未注册 Node adapter' })
  if (!appConfig.snapshot.enabled) return fetchLive(context, sourceId)
  // TODO: official 曾有 D1/filter 路径；本期只使用 SQLite。未来出现第二种 store 时在此 DB 边界抽取最小持久化端口，不预建空 repository。
  const [snapshot] = await db
    .select(vcSourceSnapshots.default)
    .from(sourceSnapshots)
    .where(eq(sourceSnapshots.id, sourceId))
    .limit(1)
  const age = snapshot ? Date.now() - snapshot.updatedAt.getTime() : Infinity
  const interval = sourceCatalog[sourceId].interval
  if (snapshot && age < interval)
    return {
      sourceId,
      items: snapshot.items,
      updatedAt: snapshot.updatedAt.getTime(),
      origin: SourceOrigin.SNAPSHOT,
      stale: false,
    }
  if (snapshot && age < appConfig.snapshot.ttlMs && !refresh)
    return {
      sourceId,
      items: snapshot.items,
      updatedAt: snapshot.updatedAt.getTime(),
      origin: SourceOrigin.SNAPSHOT,
      stale: false,
    }
  try {
    return await fetchLive(context, sourceId)
  } catch (error) {
    if (snapshot)
      return {
        sourceId,
        items: snapshot.items,
        updatedAt: snapshot.updatedAt.getTime(),
        origin: SourceOrigin.SNAPSHOT,
        stale: true,
      }
    throw error
  }
}

function fetchLive(context: Context<AppEnv>, sourceId: SourceID): Promise<SourceResult> {
  const existing = inFlight.get(sourceId)
  if (existing) return existing
  const task = (async () => {
    const adapter = sourceRegistry[sourceId]!
    let items: NewsItem[]
    try {
      items = await adapter({
        fetcher: context.get('sourceFetcher'),
        appConfig: context.get('appConfig'),
      })
    } catch (cause) {
      throw E.SOURCE.FETCH_FAILED.create({ cause })
    }
    // TODO: adapter 输出目前仅受 TypeScript contract 约束；未来应在这里、写 snapshot 前执行共享 NewsItem 运行时校验。
    const updatedAt = new Date()
    const result = {
      sourceId,
      items: items.slice(0, context.get('appConfig').snapshot.limitCount),
      updatedAt: updatedAt.getTime(),
      origin: SourceOrigin.LIVE,
      stale: false,
    } as const
    if (context.get('appConfig').snapshot.enabled && result.items.length)
      await context
        .get('db')
        .insert(sourceSnapshots)
        .values({ id: sourceId, items: result.items, updatedAt })
        .onConflictDoUpdate({ target: sourceSnapshots.id, set: { items: result.items, updatedAt } })
    return result
  })()
  inFlight.set(sourceId, task)
  return task.finally(() => inFlight.delete(sourceId))
}

// TODO: inFlight 仅合并单个 Node 进程内的并发抓取；多实例确有重复抓取问题时再评估分布式锁或租约。
