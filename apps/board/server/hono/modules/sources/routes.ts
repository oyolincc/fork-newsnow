import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import type { AppEnv } from '@/hono/shared/app/types'
import { successJson, OpenApiTags } from '@/hono/shared/network/utils'
import { generalValidator } from '@/hono/shared/network/validator'
import { E } from '@error-categories'
import { $S_SourceItemsQuery, $S_SourceSnapshotsQuery } from './contracts'
import { getSourceItems } from './resolvers/source-items'
import { getSnapshots } from './resolvers/source-snapshots'

export const sourceRoutes = new Hono<AppEnv>()
  .get(
    '/:sourceId/items',
    generalValidator('query', $S_SourceItemsQuery),
    describeRoute({
      tags: [OpenApiTags.Source],
      summary: '获取新闻源条目',
      responses: { 200: { description: '新闻条目' } },
    }),
    async (context) => {
      const refresh = context.req.valid('query').refresh === 'true'
      const appConfig = context.get('appConfig')
      if (refresh && appConfig.auth.jwtSecret && !context.get('session'))
        throw E.SOURCE.REFRESH_FORBIDDEN.create()
      return successJson(
        context,
        await getSourceItems(context, context.req.param('sourceId'), refresh),
      )
    },
  )
  .post(
    '/snapshots/query',
    generalValidator('json', $S_SourceSnapshotsQuery),
    describeRoute({
      tags: [OpenApiTags.Source],
      summary: '批量查询已有快照',
      responses: { 200: { description: '快照列表' } },
    }),
    async (context) =>
      successJson(context, await getSnapshots(context, context.req.valid('json').sourceIds)),
  )
