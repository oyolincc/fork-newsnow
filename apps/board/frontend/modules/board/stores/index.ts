import { sourceCatalog, type SourceID, type UserSyncState } from '@newsnow/definition/frontend'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { BOARD_PREFERENCES_STORAGE_KEY } from '../constants'
import { DefaultColumnSources, isCanonicalSourceId, type ColumnId } from '../models/columns'

export type BoardPreferences = UserSyncState & { action: 'init' | 'manual' | 'sync' }

// action 记录这次变化从哪来：只有用户亲手修改的 manual 才上传，服务器下发的 sync 不会再传回去形成死循环。
export const boardPreferencesAtom = atomWithStorage<BoardPreferences>(
  BOARD_PREFERENCES_STORAGE_KEY,
  { action: 'init', data: { focus: [] }, updatedTime: 0 },
)

// 旧配置里可能有已经删除的来源或来源别名；读取时把它们丢掉或换成最终 ID，组件拿到的都能直接显示。
export const focusSourceIdsAtom = atom(
  (get) =>
    (get(boardPreferencesAtom).data.focus || [])
      .map((sourceId) => {
        if (!(sourceId in sourceCatalog)) return undefined
        const source = sourceCatalog[sourceId as SourceID]
        return ('redirect' in source ? source.redirect : sourceId) as SourceID
      })
      .filter((sourceId): sourceId is SourceID => !!sourceId && isCanonicalSourceId(sourceId)),
  (get, set, sourceIds: SourceID[]) =>
    set(boardPreferencesAtom, {
      action: 'manual',
      data: { ...get(boardPreferencesAtom).data, focus: sourceIds },
      updatedTime: Date.now(),
    }),
)

// 用户切换栏目后在这里记住当前栏目，顶部的“刷新全部”才能只刷新眼前这些卡片。
export const currentColumnAtom = atom<ColumnId>('focus')
export const currentSourceIdsAtom = atom<SourceID[]>((get) => {
  const column = get(currentColumnAtom)
  return column === 'focus' ? get(focusSourceIdsAtom) : DefaultColumnSources[column]
})

export const searchOpenedAtom = atom(false)
