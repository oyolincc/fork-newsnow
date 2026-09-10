import { sourceCatalog, type SourceID } from '@newsnow/definition'
import { hasProp } from '@/hono/shared/utils'
import { githubTrendingToday } from './adapters/github'
import { hackernews } from './adapters/hackernews'
import { v2exShare } from './adapters/v2ex'
import { zhihu } from './adapters/zhihu'
import type { SourceAdapter } from './types'

// TODO: 当前 registry 仅绑定 Node adapter；未来 CF/Edge 应由各 runtime composition root 选择独立 registry，不能在单 adapter 中添加环境分支。
export const sourceRegistry: Partial<Record<SourceID, SourceAdapter>> = {
  'github-trending-today': githubTrendingToday,
  hackernews,
  'v2ex-share': v2exShare,
  zhihu,
}

export function resolveSourceId(sourceId: string): SourceID | undefined {
  if (!hasProp(sourceCatalog, sourceId)) return undefined
  const source = sourceCatalog[sourceId as SourceID]
  return ((hasProp(source, 'redirect') && source.redirect) || sourceId) as SourceID
}
