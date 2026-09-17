import { load } from 'cheerio'
import type { NewsItem } from '@newsnow/definition/backend'
import type { SourceAdapter } from '@/hono/modules/sources/types'
import { parseRelativeDate } from './utils'

export const kr36Quick: SourceAdapter = async ({ fetcher }) => {
  const baseUrl = 'https://www.36kr.com'
  const $ = load(await fetcher.get(`${baseUrl}/newsflashes`).text())
  const items: NewsItem[] = []
  $('.newsflash-item').each((_, element) => {
    const root = $(element)
    const link = root.find('a.item-title')
    const href = link.attr('href')
    const title = link.text()
    const date = root.find('.time').text()
    if (href && title && date)
      items.push({
        id: href,
        title,
        url: `${baseUrl}${href}`,
        extra: { date: parseRelativeDate(date) },
      })
  })
  return items
}

export const kr36Popular: SourceAdapter = async (input) => {
  const { fetcher } = input
  const formatted = new Date().toISOString().slice(0, 10)
  const baseUrl = 'https://36kr.com'
  const $ = load(
    await fetcher
      .get(`${baseUrl}/hot-list/renqi/${formatted}/1`, {
        headers: { referer: 'https://www.freebuf.com/' },
      })
      .text(),
  )
  const items: NewsItem[] = []
  $('.article-item-info').each((_, element) => {
    const root = $(element)
    const link = root.find('a.article-item-title.weight-bold')
    const href = link.attr('href') || ''
    const title = link.text().trim()
    if (!href || !title) return
    items.push({
      id: href.slice(3),
      title,
      url: href.startsWith('http') ? href : `${baseUrl}${href}`,
      extra: {
        hover: root.find('a.article-item-description.ellipsis-2').text().trim(),
        info: `${root.find('.kr-flow-bar-author').text().trim()}  |  ${root.find('.kr-flow-bar-hot span').text().trim()}`,
      },
    })
  })
  return items.length ? items : kr36Quick(input)
}
