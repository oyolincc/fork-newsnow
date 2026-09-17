import type { SessionUser } from '@newsnow/definition/frontend'
import { request } from '#/shared/network/client'

export type AuthStatus = { enabled: boolean }
export type CurrentUser = SessionUser & { email: string | null }

export const getAuthStatus = () => request<AuthStatus>('auth/github/status')
export const getCurrentUser = () => request<CurrentUser>('user')
export const logout = () => request<{ loggedOut: true }>('auth/logout', { method: 'post' })
