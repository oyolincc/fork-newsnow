import type { NewsItem, SourceID, SourceOrigin } from '@newsnow/definition/backend'
import type { AppConfig, AppFetcher } from '@/hono/shared/app/types'

export type SourceAdapter = (input: {
  fetcher: AppFetcher
  appConfig: AppConfig
}) => Promise<NewsItem[]>
export type SourceResult = {
  sourceId: SourceID
  items: NewsItem[]
  updatedAt: number
  origin: SourceOrigin
  stale: boolean
}
