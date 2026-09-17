import { sourceCatalog, type SourceID } from '@newsnow/definition/backend'
import { hasProp } from '@/hono/shared/utils'
import { kr36Popular, kr36Quick } from './adapters/36kr'
import { baidu } from './adapters/baidu'
import { bilibiliHotSearch } from './adapters/bilibili'
import { clsTelegraph } from './adapters/cls'
import { coolapk } from './adapters/coolapk'
import { douban } from './adapters/douban'
import { githubTrendingToday } from './adapters/github'
import { hackernews } from './adapters/hackernews'
import { ithome } from './adapters/ithome'
import { jin10 } from './adapters/jin10'
import { juejin } from './adapters/juejin'
import { producthunt } from './adapters/producthunt'
import { sspai } from './adapters/sspai'
import { steam } from './adapters/steam'
import { toutiao } from './adapters/toutiao'
import { v2exShare } from './adapters/v2ex'
import { wallstreetcnQuick } from './adapters/wallstreetcn'
import { weibo } from './adapters/weibo'
import { xueqiuHotStock } from './adapters/xueqiu'
import { zhihu } from './adapters/zhihu'
import type { SourceAdapter } from './types'

// TODO: 当前 registry 仅绑定 Node adapter；未来 CF/Edge 应由各 runtime composition root 选择独立 registry，不能在单 adapter 中添加环境分支。
export const sourceRegistry: Partial<Record<SourceID, SourceAdapter>> = {
  '36kr-quick': kr36Quick,
  '36kr-renqi': kr36Popular,
  baidu,
  'bilibili-hot-search': bilibiliHotSearch,
  'cls-telegraph': clsTelegraph,
  coolapk,
  douban,
  'github-trending-today': githubTrendingToday,
  hackernews,
  ithome,
  jin10,
  juejin,
  producthunt,
  sspai,
  steam,
  toutiao,
  'v2ex-share': v2exShare,
  'wallstreetcn-quick': wallstreetcnQuick,
  weibo,
  'xueqiu-hotstock': xueqiuHotStock,
  zhihu,
}

export function resolveSourceId(sourceId: string): SourceID | undefined {
  if (!hasProp(sourceCatalog, sourceId)) return undefined
  const source = sourceCatalog[sourceId as SourceID]
  return ((hasProp(source, 'redirect') && source.redirect) || sourceId) as SourceID
}
