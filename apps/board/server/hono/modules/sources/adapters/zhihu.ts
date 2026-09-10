import type { SourceAdapter } from '@/hono/modules/sources/types'

export const zhihu: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher
    .get('https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50')
    .json<{
      data: { target: { id: number; title: string; url: string }; detail_text?: string }[]
    }>()
  return response.data.map(({ target, detail_text }) => ({
    id: target.id,
    title: target.title,
    url: `https://www.zhihu.com${target.url}`,
    extra: { info: detail_text || false },
  }))
}
