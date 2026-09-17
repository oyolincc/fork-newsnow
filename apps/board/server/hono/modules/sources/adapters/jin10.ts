import type { SourceAdapter } from '@/hono/modules/sources/types'

type Jin10Item = {
  id: string
  time: string
  data: { title?: string; content?: string }
  important: number
  channel: number[]
}

export const jin10: SourceAdapter = async ({ fetcher }) => {
  const script = await fetcher.get(`https://www.jin10.com/flash_newest.js?t=${Date.now()}`).text()
  const items = JSON.parse(
    script
      .replace(/^var\s+newest\s*=\s*/, '')
      .replace(/;*$/, '')
      .trim(),
  ) as Jin10Item[]
  return items
    .filter((item) => (item.data.title || item.data.content) && !item.channel?.includes(5))
    .map((item) => {
      const text = (item.data.title || item.data.content)!.replace(/<\/?b>/g, '')
      const [, title, description] = text.match(/^【([^】]*)】(.*)$/) || []
      return {
        id: item.id,
        title: title || text,
        pubDate: new Date(`${item.time}+08:00`).getTime(),
        url: `https://flash.jin10.com/detail/${item.id}`,
        extra: { hover: description, info: item.important ? '✰' : false },
      }
    })
}
