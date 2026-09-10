import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { eq } from 'drizzle-orm'
import { users, vcUsers } from '@newsnow/db/sqlite/schema'
import type { AppEnv } from '@/hono/shared/app/types'
import { requireAuth } from '@/hono/middlewares/auth'
import { E } from '@error-categories'
import { successJson, OpenApiTags } from '@/hono/shared/network/utils'
import { generalValidator } from '@/hono/shared/network/validator'
import { $S_UserSyncState } from './contracts'

export const userRoutes = new Hono<AppEnv>()
  .use('*', requireAuth)
  .get(
    '/',
    describeRoute({
      tags: [OpenApiTags.User],
      summary: '当前用户',
      responses: { 200: { description: '用户资料' } },
    }),
    async (context) => {
      const session = context.get('session')!
      const [user] = await context
        .get('db')
        .select(vcUsers.default)
        .from(users)
        .where(eq(users.id, session.id))
        .limit(1)
      if (!user) throw E.USER.NOT_FOUND.create()
      return successJson(context, {
        id: session.id,
        type: session.type,
        profile: session.profile,
        email: user.email,
      })
    },
  )
  .get(
    '/sync-state',
    describeRoute({
      tags: [OpenApiTags.User],
      summary: '读取同步状态',
      responses: { 200: { description: '同步状态' } },
    }),
    async (context) => {
      const [row] = await context
        .get('db')
        .select(vcUsers.syncState)
        .from(users)
        .where(eq(users.id, context.get('session')!.id))
        .limit(1)
      if (!row) throw E.USER.NOT_FOUND.create()
      return successJson(context, row.syncState)
    },
  )
  .put(
    '/sync-state',
    generalValidator('json', $S_UserSyncState),
    describeRoute({
      tags: [OpenApiTags.User],
      summary: '更新同步状态',
      responses: { 200: { description: '同步状态' } },
    }),
    async (context) => {
      const incoming = context.req.valid('json')
      const db = context.get('db')
      const id = context.get('session')!.id
      const result = db.transaction((transaction) => {
        const row = transaction.select(vcUsers.syncState).from(users).where(eq(users.id, id)).get()
        if (!row) throw E.USER.NOT_FOUND.create()
        const current = row.syncState
        if (
          incoming.updatedTime < current.updatedTime ||
          (incoming.updatedTime === current.updatedTime &&
            JSON.stringify(incoming.data) !== JSON.stringify(current.data))
        ) {
          throw E.USER.SYNC_CONFLICT.create({ extensions: { current } })
        }
        if (incoming.updatedTime > current.updatedTime)
          transaction
            .update(users)
            .set({ syncState: incoming, updatedAt: new Date() })
            .where(eq(users.id, id))
            .run()
        return incoming.updatedTime === current.updatedTime ? current : incoming
      })
      return successJson(context, result)
    },
  )
