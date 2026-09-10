import type { AuthType } from './constants'

export interface AuthTokenPayload {
  id: string
  type: AuthType
}

export interface AuthSessionPayload extends AuthTokenPayload {
  profile: {
    name: string
    avatar: string
  }
}

export type UserSyncData = Record<string, string[]>

/**
 * 保存用户在客户端同步用的数据和版本号。数据库整体保存为 JSON，接口仍分别使用 data 与 updatedTime。
 */
export interface UserSyncState {
  data: UserSyncData
  updatedTime: number
}
