import { inArray } from 'drizzle-orm'
import { sourceSnapshots, vcSourceSnapshots } from '@newsnow/db/sqlite/schema'
import type { Context } from 'hono'
import type { AppEnv } from '@/hono/shared/app/types'
import { E } from '@error-categories'
import { resolveSourceId } from '@/hono/modules/sources/registry'

export async function getSnapshots(context: Context<AppEnv>, sourceIds: string[]) {
  if (!context.get('appConfig').snapshot.enabled) throw E.SOURCE.SNAPSHOT_DISABLED.create()
  // TODO: official 曾有 D1/filter 查询；本期使用 SQLite，未来需要远端 snapshot store 时从这一读取边界提取最小端口。
  const ids = sourceIds.map(resolveSourceId).filter((id): id is NonNullable<typeof id> => !!id)
  if (!ids.length) return []
  return context
    .get('db')
    .select(vcSourceSnapshots.default)
    .from(sourceSnapshots)
    .where(inArray(sourceSnapshots.id, ids))
}
