import type { SourceAdapter } from '@/hono/modules/sources/types'

export const hackernews: SourceAdapter = async ({ fetcher }) => {
  const ids = await fetcher
    .get('https://hacker-news.firebaseio.com/v0/topstories.json')
    .json<number[]>()
  const stories = await Promise.all(
    ids
      .slice(0, 30)
      .map((id) =>
        fetcher
          .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .json<{ id: number; title: string; url?: string; time: number; score: number } | null>(),
      ),
  )
  return stories
    .filter((story): story is NonNullable<typeof story> => !!story)
    .map((story) => ({
      id: story.id,
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      extra: { date: story.time * 1000, info: String(story.score) },
    }))
}
