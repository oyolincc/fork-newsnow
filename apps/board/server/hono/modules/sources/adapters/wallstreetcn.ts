import type { SourceAdapter } from '@/hono/modules/sources/types'

type WallstreetItem = {
  id: number
  title?: string
  content_text: string
  display_time: number
  uri: string
}

export const wallstreetcnQuick: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher
    .get('https://api-one.wallstcn.com/apiv1/content/lives', {
      searchParams: { channel: 'global-channel', limit: 30 },
    })
    .json<{ data: { items: WallstreetItem[] } }>()
  return response.data.items.map((item) => ({
    id: item.id,
    title: item.title || item.content_text,
    url: item.uri,
    extra: { date: item.display_time * 1000 },
  }))
}
