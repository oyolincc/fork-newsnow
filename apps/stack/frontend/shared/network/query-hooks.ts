import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query'

export interface QueryHookOptions {
  enabled?: boolean
  staleTime?: number
}

export interface MutationHookOptions {}

type AnyUseQueryResult = UseQueryResult<any, any>
type AnyUseMutationResult = UseMutationResult<any, any, any, any>
type HookArgs<TParams, TOptions> = [] | [params?: TParams] | [params: TParams, options?: TOptions]

export type MutationHook<TParams, TResult extends AnyUseMutationResult> = (
  params: TParams,
  options?: MutationHookOptions,
) => TResult

export function defineQueryHook<
  TParams,
  TArgs extends HookArgs<TParams, QueryHookOptions>,
  TResult extends AnyUseQueryResult,
>(hook: (...args: TArgs) => TResult) {
  return hook
}

export function defineMutationHook<
  TParams,
  TArgs extends HookArgs<TParams, MutationHookOptions>,
  TResult extends AnyUseMutationResult,
>(hook: (...args: TArgs) => TResult) {
  return hook
}
