import type { SourceID } from '@newsnow/definition/frontend'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useSession } from '#/modules/auth/hooks/session'
import { getSyncState, saveSyncState } from '#/modules/users/api'
import { useToast } from '#/shared/feedback/hooks/toast'
import { isApiError } from '#/shared/network/errors'
import { BOARD_SYNC_DEBOUNCE_MS } from '../constants'
import { boardPreferencesAtom, focusSourceIdsAtom } from '../stores'

export function useSourceFocus(sourceId: SourceID) {
  const [sourceIds, setSourceIds] = useAtom(focusSourceIdsAtom)
  const focused = sourceIds.includes(sourceId)
  return {
    focused,
    toggle: () =>
      setSourceIds(focused ? sourceIds.filter((id) => id !== sourceId) : [...sourceIds, sourceId]),
  }
}

export function useBoardSync() {
  const [preferences, setPreferences] = useAtom(boardPreferencesAtom)
  const session = useSession()
  const toast = useToast()
  const initialized = useRef(false)
  const conflicted = useRef(false)
  const [ready, setReady] = useState(false)

  // 登录后比较本地和服务器的修改时间：哪边更新就用哪边；时间相同说明内容已同步，不再重复上传。
  useEffect(() => {
    if (session.status !== 'authenticated' || initialized.current) return
    initialized.current = true
    void getSyncState()
      .then(async (remote) => {
        if (remote.updatedTime > preferences.updatedTime) {
          setPreferences({ ...remote, action: 'sync' })
        } else if (preferences.updatedTime > remote.updatedTime) {
          await saveSyncState({ data: preferences.data, updatedTime: preferences.updatedTime })
        }
        setReady(true)
      })
      .catch((error) => {
        if (isApiError(error, 409)) {
          conflicted.current = true
          toast('云端配置已变化，已暂停自动同步；本地配置没有被覆盖', { type: 'warning' })
          return
        }
        initialized.current = false
        toast('无法读取云端配置，本地配置仍然可用', { type: 'error' })
      })
  }, [preferences, session.status, setPreferences, toast])

  // 用户每次关注或拖拽都会重新计时，停手 10 秒才上传，因此连续操作只会保存最后的排列。
  useEffect(() => {
    if (
      session.status !== 'authenticated' ||
      !ready ||
      conflicted.current ||
      preferences.action !== 'manual'
    )
      return
    const timer = window.setTimeout(() => {
      void saveSyncState({ data: preferences.data, updatedTime: preferences.updatedTime })
        .then((saved) => {
          setPreferences({ ...saved, action: 'sync' })
        })
        .catch((error) => {
          if (isApiError(error, 409)) {
            conflicted.current = true
            toast('云端配置已变化，已暂停自动同步；本地配置没有被覆盖', { type: 'warning' })
            return
          }
          toast('同步配置失败，本地配置仍然可用', { type: 'error' })
        })
    }, BOARD_SYNC_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [preferences, ready, session.status, setPreferences, toast])
}
