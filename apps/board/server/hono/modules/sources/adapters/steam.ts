import { load } from 'cheerio'
import type { NewsItem } from '@newsnow/definition/backend'
import type { SourceAdapter } from '@/hono/modules/sources/types'

export const steam: SourceAdapter = async ({ fetcher }) => {
  const $ = load(await fetcher.get('https://store.steampowered.com/stats/stats/').text())
  const items: NewsItem[] = []
  $('#detailStats tr.player_count_row').each((_, element) => {
    const root = $(element)
    const link = root.find('a.gameLink')
    const url = link.attr('href')
    const title = link.text().trim()
    const currentPlayers = root.find('td:first-child .currentServers').text().trim()
    if (url && title && currentPlayers)
      items.push({ id: url, title, url, pubDate: Date.now(), extra: { info: currentPlayers } })
  })
  return items
}
