import type { NewsItem, SourceID, SourceOrigin } from '@newsnow/definition/frontend'
import { request } from '#/shared/network/client'

export type SourceResult = {
  sourceId: SourceID
  items: NewsItem[]
  updatedAt: number
  origin: SourceOrigin
  stale: boolean
}

type SourceSnapshot = { id: SourceID; items: NewsItem[]; updatedAt: string | number }

// 用户点刷新按钮时 refresh=true，服务端会重新抓取；其他时候优先返回已有缓存，页面打开得更快。
export const getSourceItems = (sourceId: SourceID, refresh = false) =>
  request<SourceResult>(`source/${sourceId}/items`, {
    searchParams: refresh ? { refresh: 'true' } : undefined,
  })

export const getSourceSnapshots = (sourceIds: SourceID[]) =>
  request<SourceSnapshot[]>('source/snapshots/query', {
    method: 'post',
    json: { sourceIds },
  })
