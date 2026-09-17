import type { SourceAdapter } from '@/hono/modules/sources/types'
import { hash } from './utils'

const baseParams = { appName: 'CailianpressWeb', os: 'web', sv: '7.7.5' }

async function signedSearchParams(extra: Record<string, string | number> = {}) {
  const searchParams = new URLSearchParams(
    Object.entries({ ...baseParams, ...extra }).map(([key, value]) => [key, String(value)]),
  )
  searchParams.sort()
  searchParams.append('sign', hash('md5', hash('sha1', searchParams.toString())))
  return searchParams
}

export const clsTelegraph: SourceAdapter = async ({ fetcher }) => {
  const response = await fetcher
    .get('https://www.cls.cn/v1/roll/get_roll_list', {
      searchParams: await signedSearchParams({
        last_time: Math.floor(Date.now() / 1000),
        refresh_type: 1,
        rn: 30,
      }),
      headers: { referer: 'https://www.cls.cn/telegraph' },
    })
    .json<{
      data: {
        roll_data: {
          id: number
          title?: string
          brief: string
          shareurl: string
          ctime: number
          is_ad: number
        }[]
      }
    }>()
  return response.data.roll_data
    .filter((item) => !item.is_ad)
    .map((item) => ({
      id: item.id,
      title: item.title || item.brief,
      mobileUrl: item.shareurl,
      pubDate: item.ctime * 1000,
      url: `https://www.cls.cn/detail/${item.id}`,
    }))
}
