import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useSourceSnapshots } from '#/modules/sources/hooks/api-hooks'
import { ColumnNames, DefaultColumnSources, type ColumnId } from '../models/columns'
import { currentColumnAtom, focusSourceIdsAtom } from '../stores'
import { SortableGrid } from './SortableGrid'

export function NewsBoard({ columnId }: { columnId: ColumnId }) {
  const setCurrentColumn = useSetAtom(currentColumnAtom)
  const [focusSourceIds, setFocusSourceIds] = useAtom(focusSourceIdsAtom)
  const sourceIds = columnId === 'focus' ? focusSourceIds : DefaultColumnSources[columnId]
  useSourceSnapshots(sourceIds)

  // 地址切换到某个栏目后记下它，让顶部“刷新全部”知道该刷哪些卡片，同时改掉浏览器标签标题。
  useEffect(() => {
    setCurrentColumn(columnId)
    document.title = `NewsNow | ${ColumnNames[columnId]}`
  }, [columnId, setCurrentColumn])
  if (!sourceIds.length)
    return (
      <div className="mx-auto max-w-lg py-20 text-center text-neutral-500">
        还没有关注新闻源，点击“更多”添加你感兴趣的来源。
      </div>
    )
  return (
    <SortableGrid
      sourceIds={sourceIds}
      sortable={columnId === 'focus'}
      setSourceIds={columnId === 'focus' ? setFocusSourceIds : undefined}
    />
  )
}
