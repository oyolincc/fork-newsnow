import { getContext } from 'hono/context-storage'
import type { AppEnv, AppFetcher } from '@/hono/shared/app/types'
import type { FetcherType } from './fetcher'

function defineAPI<TArgs extends unknown[], TResult>(
  fetcherType: FetcherType,
  factory: (fetcher: AppFetcher, ...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  return (...args) => factory(getContext<AppEnv>().var[fetcherType], ...args)
}

export function defineSourceAPI<TArgs extends unknown[], TResult>(
  factory: (fetcher: AppFetcher, ...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  return defineAPI('sourceFetcher', factory)
}

export function defineGitHubAPI<TArgs extends unknown[], TResult>(
  factory: (fetcher: AppFetcher, ...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  return defineAPI('githubFetcher', factory)
}
