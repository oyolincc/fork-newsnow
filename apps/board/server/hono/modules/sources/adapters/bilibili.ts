import type { SourceAdapter } from '@/hono/modules/sources/types'

export const bilibiliHotSearch: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher.get('https://s.search.bilibili.com/main/hotword?limit=30').json<{
    list: { keyword: string; show_name: string; icon: string }[]
  }>()
  return response.list.map((item) => ({
    id: item.keyword,
    title: item.show_name,
    url: `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.keyword)}`,
    extra: { icon: item.icon },
  }))
}
