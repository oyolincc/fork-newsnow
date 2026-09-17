import type { SourceAdapter } from '@/hono/modules/sources/types'

export const douban: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher
    .get('https://m.douban.com/rexxar/api/v2/subject/recent_hot/movie', {
      headers: {
        accept: 'application/json, text/plain, */*',
        referer: 'https://movie.douban.com/',
      },
    })
    .json<{ items: { id: string; title: string; card_subtitle: string }[] }>()
  return response.items.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: `https://movie.douban.com/subject/${movie.id}`,
    extra: {
      info: movie.card_subtitle.split(' / ').slice(0, 3).join(' / '),
      hover: movie.card_subtitle,
    },
  }))
}
