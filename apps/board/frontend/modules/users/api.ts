import type { UserSyncState } from '@newsnow/definition/frontend'
import { request } from '#/shared/network/client'

export const getSyncState = () => request<UserSyncState>('user/sync-state')
export const saveSyncState = (state: UserSyncState) =>
  request<UserSyncState>('user/sync-state', { method: 'put', json: state })
