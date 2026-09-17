import { load } from 'cheerio'
import type { NewsItem } from '@newsnow/definition/backend'
import type { SourceAdapter } from '@/hono/modules/sources/types'

export const weibo: SourceAdapter = async ({ fetcher }) => {
  const baseUrl = 'https://s.weibo.com'
  const url = `${baseUrl}/top/summary?cate=realtimehot`
  const html = await fetcher
    .get(url, {
      headers: {
        cookie:
          'SUB=_2AkMWIuNSf8NxqwJRmP8dy2rhaoV2ygrEieKgfhKJJRMxHRl-yT9jqk86tRB6PaLNvQZR6zYUcYVT1zSjoSreQHidcUq7',
        referer: url,
      },
    })
    .text()
  const $ = load(html)
  const items: NewsItem[] = []
  $('#pl_top_realtimehot table tbody tr')
    .slice(1)
    .each((_, row) => {
      const root = $(row)
      const link = root
        .find('td.td-02 a')
        .filter((__, element) => {
          const href = $(element).attr('href')
          return !!href && !href.includes('javascript:void(0)')
        })
        .first()
      const title = link.text().trim()
      const href = link.attr('href')
      if (!title || !href) return
      const flag = root.find('td.td-03').text().trim()
      const icon = { 新: '1_0', 热: '2_0', 爆: '4_0' }[flag]
      items.push({
        id: title,
        title,
        url: `${baseUrl}${href}`,
        mobileUrl: `${baseUrl}${href}`,
        extra: {
          icon: icon
            ? { url: `https://simg.s.weibo.com/moter/flags/${icon}.png`, scale: 1.5 }
            : undefined,
        },
      })
    })
  return items
}
