import type { AppFetcher } from '@/hono/shared/app/types'
import type { GitHubToken, GitHubUser } from './types'

export const getGitHubToken = (fetcher: AppFetcher, url: string, body: URLSearchParams) =>
  fetcher.post(url, { body, headers: { accept: 'application/json' } }).json<GitHubToken>()
export const getGitHubUser = (fetcher: AppFetcher, url: string, accessToken: string) =>
  fetcher.get(url, { headers: { authorization: `Bearer ${accessToken}` } }).json<GitHubUser>()
