import type { SourceAdapter } from '@/hono/modules/sources/types'

export const toutiao: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher
    .get('https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc')
    .json<{
      data: { ClusterIdStr: string; Title: string; LabelUri?: { url: string } }[]
    }>()
  return response.data.map((item) => ({
    id: item.ClusterIdStr,
    title: item.Title,
    url: `https://www.toutiao.com/trending/${item.ClusterIdStr}/`,
    extra: { icon: item.LabelUri?.url },
  }))
}
