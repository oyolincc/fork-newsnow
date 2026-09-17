import type { SessionUser } from '@newsnow/definition/frontend'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { onUnauthorized } from '#/shared/network/client'
import { isApiError } from '#/shared/network/errors'
import { BOARD_PREFERENCES_STORAGE_KEY } from '#/modules/board/constants'
import { getCurrentUser, logout as logoutRequest } from '../api'
import { AuthDefaults } from '../constants'
import { authKeys, useAuthStatus } from '../hooks/api-hooks'
import {
  readStoredUser,
  SessionContext,
  writeStoredUser,
  type SessionState,
} from '../stores/session'

export function SessionProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const authStatus = useAuthStatus()
  const [session, setSessionState] = useState<SessionState>({ status: 'restoring', user: null })
  const sessionRef = useRef(session)
  const restorationRef = useRef<Promise<SessionUser | null>>(null)

  // React state 负责刷新界面，ref 让稍后执行的请求回调和浏览器事件也能读到最新用户，而不是旧闭包里的值。
  const setSession = useCallback((next: SessionState) => {
    sessionRef.current = next
    setSessionState(next)
  }, [])

  const clearSession = useCallback(
    (reload = false) => {
      localStorage.removeItem(AuthDefaults.STORAGE_KEY)
      localStorage.removeItem(BOARD_PREFERENCES_STORAGE_KEY)
      queryClient.removeQueries({ queryKey: authKeys.currentUser() })
      setSession({ status: 'anonymous', user: null })
      if (reload) window.location.reload()
    },
    [queryClient, setSession],
  )

  // localStorage 里的头像和昵称只能让页面先显示出来；随后仍请求 /user，用 HttpOnly Cookie 确认是否真的登录。
  const restore = useCallback(
    (fallbackUser: SessionUser | null = sessionRef.current.user) => {
      if (restorationRef.current) return restorationRef.current
      setSession({ status: 'restoring', user: fallbackUser })
      const restoration = queryClient
        .query({ queryKey: authKeys.currentUser(), queryFn: getCurrentUser, staleTime: 0 })
        .then((current) => {
          const restored: SessionUser = {
            id: current.id,
            type: current.type,
            profile: current.profile,
          }
          writeStoredUser(restored)
          setSession({ status: 'authenticated', user: restored })
          return restored
        })
        .catch((error: unknown) => {
          if (isApiError(error, 401)) {
            setSession({ status: 'anonymous', user: null })
            return null
          }
          // 如果只是网络临时失败，已有头像继续显示；本来就没有本地用户时，页面按未登录状态正常浏览。
          setSession(
            fallbackUser
              ? { status: 'authenticated', user: fallbackUser }
              : { status: 'anonymous', user: null },
          )
          return fallbackUser
        })
        .finally(() => {
          restorationRef.current = null
        })
      restorationRef.current = restoration
      return restoration
    },
    [queryClient, setSession],
  )

  useEffect(() => {
    // 只有浏览器留有用户资料，或刚从 GitHub 登录回来，才请求 /user；普通匿名用户打开首页不会请求它。
    const storedUser = readStoredUser()
    const url = new URL(window.location.href)
    const oauthReturn =
      url.searchParams.get(AuthDefaults.OAUTH_MARKER) === AuthDefaults.OAUTH_PROVIDER
    if (storedUser || oauthReturn) void restore(storedUser)
    else setSession({ status: 'anonymous', user: null })
    if (oauthReturn) {
      url.searchParams.delete(AuthDefaults.OAUTH_MARKER)
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
    }
  }, [restore, setSession])

  useEffect(
    () =>
      onUnauthorized(() => {
        const current = sessionRef.current
        if (current.user || current.status === 'authenticated') clearSession(true)
      }),
    [clearSession],
  )

  // 同一浏览器的另一个标签页登录或退出会触发 storage 事件；本页随后更新用户，退出时也清掉他的关注列表。
  useEffect(() => {
    const syncSession = (event: StorageEvent) => {
      if (event.key !== AuthDefaults.STORAGE_KEY) return
      const storedUser = readStoredUser(event.newValue)
      if (storedUser) void restore(storedUser)
      else if (sessionRef.current.user) clearSession(true)
    }
    window.addEventListener('storage', syncSession)
    return () => window.removeEventListener('storage', syncSession)
  }, [clearSession, restore])

  const ensureAuthenticated = async () => {
    const current = sessionRef.current
    return current.status === 'authenticated' && current.user ? current.user : restore()
  }
  const login = () => window.location.assign(AuthDefaults.LOGIN_URL)
  const logout = async () => {
    await logoutRequest()
    clearSession(true)
  }

  return (
    // 下面的组件只需要 login、logout 和当前用户，不需要各自处理 Cookie、跨标签页通知或 401。
    <SessionContext.Provider
      value={{
        ...session,
        enabled: authStatus.data?.enabled === true,
        loading: authStatus.isLoading || session.status === 'restoring',
        login,
        logout,
        ensureAuthenticated,
      }}>
      {children}
    </SessionContext.Provider>
  )
}
