import { load } from 'cheerio'
import type { NewsItem } from '@newsnow/definition/backend'
import type { SourceAdapter } from '@/hono/modules/sources/types'
import { parseRelativeDate } from './utils'

export const ithome: SourceAdapter = async ({ fetcher }) => {
  const $ = load(await fetcher.get('https://www.ithome.com/list/').text())
  const items: NewsItem[] = []
  $('#list > div.fl > ul > li').each((_, element) => {
    const root = $(element)
    const link = root.find('a.t')
    const url = link.attr('href')
    const title = link.text()
    const date = root.find('i').text()
    if (!url || !title || !date) return
    if (
      url.includes('lapin') ||
      ['神券', '优惠', '补贴', '京东'].some((word) => title.includes(word))
    )
      return
    items.push({ id: url, title, url, pubDate: parseRelativeDate(date) })
  })
  return items.sort((left, right) => Number(right.pubDate) - Number(left.pubDate))
}
