import { load } from 'cheerio'
import type { SourceAdapter } from '@/hono/modules/sources/types'
import { encodeBase64, hash } from './utils'

function createHeaders() {
  const deviceId = [10, 6, 6, 6, 14]
    .map((length) => Math.random().toString(36).slice(2, length))
    .join('-')
  const now = Math.round(Date.now() / 1000)
  const seed = `token://com.coolapk.market/c67ef5943784d09750dcfbb31020f0ab?${hash('md5', String(now))}$${deviceId}&com.coolapk.market`
  return {
    'X-Requested-With': 'XMLHttpRequest',
    'X-App-Id': 'com.coolapk.market',
    'X-App-Token': `${hash('md5', encodeBase64(seed))}${deviceId}0x${now.toString(16)}`,
    'X-Sdk-Int': '29',
    'X-Sdk-Locale': 'zh-CN',
    'X-App-Version': '11.0',
    'X-Api-Version': '11',
    'X-App-Code': '2101202',
    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 10; Redmi K30 5G) +CoolMarket/11.0-2101202',
  }
}

export const coolapk: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher
    .get(
      'https://api.coolapk.com/v6/page/dataList?url=%2Ffeed%2FstatList%3FcacheExpires%3D300%26statType%3Dday%26sortField%3Ddetailnum%26title%3D%E4%BB%8A%E6%97%A5%E7%83%AD%E9%97%A8&title=%E4%BB%8A%E6%97%A5%E7%83%AD%E9%97%A8&subTitle=&page=1',
      {
        headers: createHeaders(),
      },
    )
    .json<{
      data: {
        id: string
        message: string
        editor_title: string
        url: string
        targetRow: { subTitle: string }
      }[]
    }>()
  if (!response.data.length) throw new Error('Coolapk hot list is empty')
  return response.data
    .filter((item) => item.id)
    .map((item) => ({
      id: item.id,
      title: item.editor_title || load(item.message).text().split('\n')[0],
      url: `https://www.coolapk.com${item.url}`,
      extra: { info: item.targetRow?.subTitle },
    }))
}
