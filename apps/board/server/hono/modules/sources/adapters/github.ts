import { load } from 'cheerio'
import type { SourceAdapter } from '@/hono/modules/sources/types'

export const githubTrendingToday: SourceAdapter = async ({ fetcher }) => {
  const html = await fetcher.get('https://github.com/trending?since=daily').text()
  return load(html)('article.Box-row')
    .map((_, element) => {
      const root = load(element)
      const path = root('h2 a').attr('href')?.trim() || ''
      const info: string | false = root('[itemprop="programmingLanguage"]').text().trim() || false
      return {
        id: path,
        title: path.replace('/', ''),
        url: `https://github.com${path}`,
        extra: { info },
      }
    })
    .get()
    .filter((item) => item.id)
}
