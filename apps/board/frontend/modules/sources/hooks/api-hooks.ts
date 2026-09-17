import { sourceCatalog, SourceOrigin, type SourceID } from '@newsnow/definition/frontend'
import { useIsFetching, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query'
import { getSourceItems, getSourceSnapshots, type SourceResult } from '../api'
import { SourceDefaults } from '../constants'

export const sourceKeys = {
  // 要清空全部新闻来源缓存时，使用这个最上层 key。
  all: ['sources'] as const,
  // 要刷新所有已打开的来源卡片时，使用这个 key；item() 再追加具体来源 ID。
  items: () => [...sourceKeys.all, 'items'] as const,
  item: (sourceId: SourceID) => [...sourceKeys.items(), sourceId] as const,
  // 要清空所有批量快照时，使用这个 key；snapshot() 再追加本次请求包含的来源 ID。
  snapshots: () => [...sourceKeys.all, 'snapshots'] as const,
  snapshot: (sourceIds: SourceID[]) => [...sourceKeys.snapshots(), sourceIds] as const,
}

type SourceCache = {
  results: Map<SourceID, SourceResult>
  forcedSources: Set<SourceID>
}

const SourceCaches = new WeakMap<QueryClient, SourceCache>()

// 每个页面都有自己的 QueryClient，因此把额外缓存挂在它名下；服务端处理 A 用户时不会读到 B 用户留下的数据。
function getSourceCache(queryClient: QueryClient) {
  let cache = SourceCaches.get(queryClient)
  if (!cache) {
    cache = { results: new Map(), forcedSources: new Set() }
    SourceCaches.set(queryClient, cache)
  }
  return cache
}

// 热榜拿新旧两次排名做比较，算出“上升/下降几名”；普通时间线没有排名，直接保存服务端结果。
function rememberSource(results: Map<SourceID, SourceResult>, result: SourceResult) {
  const previous = results.get(result.sourceId)
  const metadata = sourceCatalog[result.sourceId]
  if (!previous || !('type' in metadata) || metadata.type !== 'hottest') {
    results.set(result.sourceId, result)
    return result
  }

  // 例如一条新闻从第 5 名变成第 2 名，diff 就是 3；上次榜单里没有它时不显示升降。
  const ranked = {
    ...result,
    items: result.items.map((item, index) => {
      const previousIndex = previous.items.findIndex(({ id }) => id === item.id)
      return {
        ...item,
        extra: {
          ...item.extra,
          diff: previousIndex < 0 ? undefined : previousIndex - index,
        },
      }
    }),
  }
  results.set(result.sourceId, ranked)
  return ranked
}

export function useSourceItems(sourceId: SourceID) {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: sourceKeys.item(sourceId),
    queryFn: async () => {
      const cache = getSourceCache(queryClient)
      const refresh = cache.forcedSources.delete(sourceId)
      const cached = cache.results.get(sourceId)
      if (!refresh && cached) {
        // 用户切换栏目再回来时直接用上次数据，不重新访问服务端；仍显示 200ms 加载动画，避免卡片突然闪现。
        await new Promise((resolve) => window.setTimeout(resolve, SourceDefaults.CACHE_REUSE_DELAY))
        return cached
      }
      return rememberSource(cache.results, await getSourceItems(sourceId, refresh))
    },
    placeholderData: (previous) => previous,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  })
}

export function useSourcesFetching(sourceIds: SourceID[]) {
  const items = useIsFetching({
    queryKey: sourceKeys.items(),
    predicate: ({ queryKey }) => sourceIds.includes(queryKey[2] as SourceID),
  })
  const snapshots = useIsFetching({ queryKey: sourceKeys.snapshots() })
  return items + snapshots > 0
}

export async function refreshSources(queryClient: QueryClient, sourceIds: SourceID[]) {
  // 先记住哪些来源是用户手动刷新的，再重跑当前页面上的查询；这样请求会带 refresh=true，没显示的卡片不会请求。
  const forcedSources = getSourceCache(queryClient).forcedSources
  forcedSources.clear()
  sourceIds.forEach((sourceId) => forcedSources.add(sourceId))
  await queryClient.refetchQueries({
    queryKey: sourceKeys.items(),
    predicate: ({ queryKey }) => sourceIds.includes(queryKey[2] as SourceID),
  })
}

export function useSourceSnapshots(sourceIds: SourceID[]) {
  const queryClient = useQueryClient()
  const sortedIds = [...sourceIds].sort()
  return useQuery({
    queryKey: sourceKeys.snapshot(sortedIds),
    enabled: sortedIds.length > 0,
    staleTime: SourceDefaults.SNAPSHOTS_STALE_TIME,
    retry: false,
    queryFn: async () => {
      // 逐个比较更新时间：服务端快照较新才替换本地数据，最后只让这些有新内容的卡片重新渲染。
      const snapshots = await getSourceSnapshots(sortedIds)
      const changed: SourceID[] = []
      const results = getSourceCache(queryClient).results
      for (const snapshot of snapshots) {
        const updatedAt =
          typeof snapshot.updatedAt === 'number'
            ? snapshot.updatedAt
            : Date.parse(snapshot.updatedAt)
        const previous = results.get(snapshot.id)
        if (previous && previous.updatedAt >= updatedAt) continue
        rememberSource(results, {
          sourceId: snapshot.id,
          items: snapshot.items,
          updatedAt,
          origin: SourceOrigin.SNAPSHOT,
          stale: false,
        })
        changed.push(snapshot.id)
      }
      await queryClient.refetchQueries({
        queryKey: sourceKeys.items(),
        predicate: ({ queryKey }) => changed.includes(queryKey[2] as SourceID),
      })
      return snapshots
    },
  })
}
