import { createHash } from 'node:crypto'
import { Buffer } from 'node:buffer'
import { XMLParser } from 'fast-xml-parser'
import type { NewsItem } from '@newsnow/definition/backend'
import type { AppFetcher } from '@/hono/shared/app/types'

export const hash = (algorithm: 'md5' | 'sha1', value: string) =>
  createHash(algorithm).update(value).digest('hex')

export const encodeBase64 = (value: string) => Buffer.from(value).toString('base64')

export function parseRelativeDate(value: string) {
  if (value === '刚刚') return Date.now()
  const relative = value.replaceAll(' ', '').match(/^(\d+)(秒|分钟|小时|天)前$/)
  if (relative) {
    const units = { 秒: 1_000, 分钟: 60_000, 小时: 3_600_000, 天: 86_400_000 }
    return Date.now() - Number(relative[1]) * units[relative[2] as keyof typeof units]
  }
  const clock = value.match(/^(今天|昨天)?\s*(\d{1,2}):(\d{2})$/)
  if (clock) {
    const date = new Date()
    if (clock[1] === '昨天') date.setDate(date.getDate() - 1)
    date.setHours(Number(clock[2]), Number(clock[3]), 0, 0)
    return date.getTime()
  }
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? Date.now() : parsed
}

export async function readRss(fetcher: AppFetcher, url: string): Promise<NewsItem[]> {
  const xml = await fetcher.get(url).text()
  const parsed = new XMLParser({
    attributeNamePrefix: '',
    textNodeName: '$text',
    ignoreAttributes: false,
  }).parse(xml) as any
  let channel = parsed.rss?.channel || parsed.feed
  if (Array.isArray(channel)) channel = channel[0]
  const entries = channel?.item || channel?.entry || []
  return (Array.isArray(entries) ? entries : [entries])
    .map((entry: any) => ({
      id:
        entry.guid?.$text ||
        entry.guid ||
        entry.id?.$text ||
        entry.id ||
        entry.link?.href ||
        entry.link,
      title: entry.title?.$text || entry.title,
      url: entry.link?.href || entry.link,
      pubDate: entry.updated || entry.pubDate || entry.created,
      extra: {
        hover: entry.summary?.$text || entry.summary || entry.description,
      },
    }))
    .filter((item: NewsItem) => item.id && item.title && item.url)
}
