import type { SourceAdapter } from '@/hono/modules/sources/types'

export const xueqiuHotStock: SourceAdapter = async ({ fetcher }) => {
  const cookieResponse = await fetcher.get('https://xueqiu.com/hq')
  const cookie = cookieResponse.headers.getSetCookie().join('; ')
  const response = await fetcher
    .get('https://stock.xueqiu.com/v5/stock/hot_stock/list.json', {
      searchParams: { size: 30, _type: 10, type: 10 },
      headers: { cookie },
    })
    .json<{
      data: {
        items: { code: string; name: string; percent: number; exchange: string; ad: number }[]
      }
    }>()
  return response.data.items
    .filter((item) => !item.ad)
    .map((item) => ({
      id: item.code,
      title: item.name,
      url: `https://xueqiu.com/s/${item.code}`,
      extra: { info: `${item.percent}% ${item.exchange}` },
    }))
}
