import type { SessionUser } from '@newsnow/definition/frontend'
import { createContext } from 'react'
import { AuthDefaults } from '../constants'

export type SessionStatus = 'restoring' | 'anonymous' | 'authenticated'
export type SessionState = { status: SessionStatus; user: SessionUser | null }
export type Session = SessionState & {
  enabled: boolean
  loading: boolean
  login: () => void
  logout: () => Promise<void>
  ensureAuthenticated: () => Promise<SessionUser | null>
}

type StoredSession = { version: number; user: SessionUser }

export const SessionContext = createContext<Session | null>(null)

export function readStoredUser(
  raw = localStorage.getItem(AuthDefaults.STORAGE_KEY),
): SessionUser | null {
  if (!raw) return null
  try {
    const stored = JSON.parse(raw) as Partial<StoredSession>
    if (stored.version === AuthDefaults.SESSION_VERSION && stored.user?.profile) return stored.user
  } catch {
    // JSON 损坏或版本不对时直接清掉；这份数据本来就不是登录凭证，之后仍由服务端 Cookie 判断是否登录。
  }
  localStorage.removeItem(AuthDefaults.STORAGE_KEY)
  return null
}

export function writeStoredUser(user: SessionUser) {
  localStorage.setItem(
    AuthDefaults.STORAGE_KEY,
    JSON.stringify({ version: AuthDefaults.SESSION_VERSION, user } satisfies StoredSession),
  )
}
