import type { SourceAdapter } from '@/hono/modules/sources/types'

export const v2exShare: SourceAdapter = async ({ fetcher }) => {
  const feeds = await Promise.all(
    ['create', 'ideas', 'programmer', 'share'].map((name) =>
      fetcher.get(`https://www.v2ex.com/feed/${name}.json`).json<{
        items: {
          id: string
          title: string
          url: string
          date_modified?: string
          date_published: string
        }[]
      }>(),
    ),
  )
  return feeds
    .flatMap((feed) => feed.items)
    .map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      extra: { date: item.date_modified || item.date_published },
    }))
    .sort((left, right) => String(right.extra?.date).localeCompare(String(left.extra?.date)))
}
