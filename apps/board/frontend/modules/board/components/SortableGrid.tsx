import { useAutoAnimate } from '@formkit/auto-animate/react'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import type {
  BaseEventPayload,
  ElementDragType,
} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types'
import type { SourceID } from '@newsnow/definition/frontend'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { SourceCard, SourceCardPreview } from '#/modules/sources/components/SourceCard'
import { MOBILE_MEDIA_QUERY } from '#/shared/viewport/constants'
import { ScrollRootContext } from '#/shared/viewport/contexts/scroll-root'
import { useMedia } from '#/shared/viewport/hooks/media'
import { BOARD_REORDER_INTERVAL_MS } from '../constants'
import { useSourceFocus } from '../hooks/preferences'
import { useSortable } from '../hooks/sortable'
import { DragContext } from './DragContext'

export function SortableGrid({
  sourceIds,
  sortable,
  setSourceIds,
}: {
  sourceIds: SourceID[]
  sortable: boolean
  setSourceIds?: (ids: SourceID[]) => void
}) {
  const mobile = useMedia(MOBILE_MEDIA_QUERY)
  const scrollRoot = useContext(ScrollRootContext)
  const [parent] = useAutoAnimate({ duration: 200 })

  // 拖到目标卡片前半边就插到它前面，后半边就插到后面；手机横向判断，电脑纵向判断。
  const onDropTargetChange = ({ location, source }: BaseEventPayload<ElementDragType>) => {
    const target = location.current.dropTargets[0]
    if (!target?.data || !setSourceIds) return
    const fromIndex = sourceIds.indexOf(source.data.id as SourceID)
    const toIndex = sourceIds.indexOf(target.data.id as SourceID)
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return
    setSourceIds(
      reorderWithEdge({
        list: sourceIds,
        startIndex: fromIndex,
        indexOfTarget: toIndex,
        closestEdgeOfTarget: extractClosestEdge(target.data),
        axis: mobile ? 'horizontal' : 'vertical',
      }),
    )
  }
  const onDropTargetChangeRef = useRef(onDropTargetChange)
  onDropTargetChangeRef.current = onDropTargetChange
  const lastReorder = useRef(0)
  const trailingReorder = useRef<number>(undefined)
  const pendingReorder = useRef<BaseEventPayload<ElementDragType>>(undefined)
  // 鼠标移动时拖拽库会连续回调。这里立即处理第一次，之后最多每 200ms 处理一次，并保证最后一次不会漏掉。
  const reorder = useCallback((payload: BaseEventPayload<ElementDragType>) => {
    const run = (next: BaseEventPayload<ElementDragType>) => {
      lastReorder.current = Date.now()
      onDropTargetChangeRef.current(next)
    }
    const remaining = BOARD_REORDER_INTERVAL_MS - (Date.now() - lastReorder.current)
    if (remaining <= 0) {
      window.clearTimeout(trailingReorder.current)
      pendingReorder.current = undefined
      run(payload)
      return
    }
    pendingReorder.current = payload
    window.clearTimeout(trailingReorder.current)
    trailingReorder.current = window.setTimeout(() => {
      if (pendingReorder.current) run(pendingReorder.current)
      pendingReorder.current = undefined
    }, remaining)
  }, [])
  useEffect(() => () => window.clearTimeout(trailingReorder.current), [])

  // “关注”栏目允许调整顺序，所以启用拖拽；“最热”和“实时”顺序固定，只渲染相同的卡片列表。
  const content = (
    <motion.ol
      ref={parent}
      className={
        mobile
          ? 'flex snap-x gap-6 overflow-x-auto px-2 pb-4'
          : 'grid w-full grid-cols-[repeat(auto-fill,minmax(min(350px,100%),1fr))] gap-6'
      }
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
      }}>
      {sourceIds.map((sourceId) => (
        <motion.li
          key={sourceId}
          className={mobile ? 'w-[min(350px,calc(100vw-16px))] flex-shrink-0 snap-center' : ''}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.2 }}>
          <SortableSourceCard sourceId={sourceId} sortable={sortable} />
        </motion.li>
      ))}
    </motion.ol>
  )
  return (
    <>
      {sortable ? (
        <DragContext onDropTargetChange={reorder} scrollElement={scrollRoot || undefined}>
          {content}
        </DragContext>
      ) : (
        content
      )}
      {mobile && <p className="mt-2 text-center text-sm text-gray-500">左右滑动查看更多</p>}
    </>
  )
}

function SortableSourceCard({ sourceId, sortable }: { sourceId: SourceID; sortable: boolean }) {
  const focus = useSourceFocus(sourceId)
  const drag = useSortable(sourceId)
  return (
    <>
      {/* 拖动时原卡片留在原位并变淡，跟着鼠标移动的是渲染到拖拽库容器里的副本。 */}
      <SourceCard
        ref={drag.setNode}
        sourceId={sourceId}
        dragging={drag.dragging}
        focused={focus.focused}
        onToggleFocus={focus.toggle}
        setHandleRef={sortable ? drag.setHandle : undefined}
      />
      {drag.preview &&
        createPortal(
          <SourceCardPreview
            sourceId={sourceId}
            rounded={
              !(
                /^(iPad|iPhone|iPod)( Simulator)?$/.test(navigator.platform) ||
                (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
              )
            }
          />,
          drag.preview,
        )}
    </>
  )
}
