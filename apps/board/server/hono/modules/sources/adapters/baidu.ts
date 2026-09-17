import type { SourceAdapter } from '@/hono/modules/sources/types'

type BaiduResponse = {
  data: { cards: { content: { isTop?: boolean; word: string; rawUrl: string; desc?: string }[] }[] }
}

export const baidu: SourceAdapter = async ({ fetcher }) => {
  const html = await fetcher.get('https://top.baidu.com/board?tab=realtime').text()
  const serialized = html.match(/<!--s-data:(.*?)-->/s)?.[1]
  if (!serialized) throw new Error('Baidu hot list payload not found')
  const response = JSON.parse(serialized) as BaiduResponse
  return response.data.cards[0].content
    .filter((item) => !item.isTop)
    .map((item) => ({
      id: item.rawUrl,
      title: item.word,
      url: item.rawUrl,
      extra: { hover: item.desc },
    }))
}
