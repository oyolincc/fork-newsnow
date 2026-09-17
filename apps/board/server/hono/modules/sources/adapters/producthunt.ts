import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { NewsItem } from '@newsnow/definition/backend'
import type { SourceAdapter } from '@/hono/modules/sources/types'
import { readRss } from './utils'

dayjs.extend(utc)
dayjs.extend(timezone)

export const producthunt: SourceAdapter = async ({ fetcher, appConfig }) => {
  const fallback = () => readRss(fetcher, 'https://www.producthunt.com/feed')
  const token = appConfig.thirdParty.producthuntApiToken
  if (!token) return fallback()
  const query = `
    query($postedAfter: DateTime!) {
      posts(first: 30, order: RANKING, postedAfter: $postedAfter) {
        edges { node { id name tagline votesCount url slug } }
      }
    }
  `
  try {
    const response = await fetcher
      .post('https://api.producthunt.com/v2/api/graphql', {
        headers: { authorization: `Bearer ${token}` },
        json: {
          query,
          variables: {
            postedAfter: dayjs().tz('America/Los_Angeles').startOf('day').toISOString(),
          },
        },
      })
      .json<{
        data?: {
          posts?: {
            edges?: {
              node: {
                id: string
                name: string
                tagline: string
                votesCount: number
                url?: string
                slug: string
              }
            }[]
          }
        }
      }>()
    const items: NewsItem[] = (response.data?.posts?.edges || [])
      .map(({ node }) => ({
        id: node.id,
        title: node.name,
        url: node.url || `https://www.producthunt.com/posts/${node.slug}`,
        extra: { info: ` △︎ ${node.votesCount || 0}`, hover: node.tagline },
      }))
      .filter((item) => item.id && item.title)
    return items.length ? items : fallback()
  } catch {
    return fallback()
  }
}
