import type { SourceAdapter } from '@/hono/modules/sources/types'

export const juejin: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher
    .get(
      'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&spider=0',
    )
    .json<{
      data: { content: { title: string; content_id: string } }[]
    }>()
  return response.data.map(({ content }) => ({
    id: content.content_id,
    title: content.title,
    url: `https://juejin.cn/post/${content.content_id}`,
  }))
}
