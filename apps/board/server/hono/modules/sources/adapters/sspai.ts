import type { SourceAdapter } from '@/hono/modules/sources/types'

export const sspai: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher
    .get('https://sspai.com/api/v1/article/tag/page/get', {
      searchParams: {
        limit: 30,
        offset: 0,
        created_at: Date.now(),
        tag: '热门文章',
        released: false,
      },
    })
    .json<{ data: { id: number; title: string }[] }>()
  return response.data.map((item) => ({
    id: item.id,
    title: item.title,
    url: `https://sspai.com/post/${item.id}`,
  }))
}
