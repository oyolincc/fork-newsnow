import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { useContext, useEffect, useRef, useState } from 'react'
import { DragInstanceContext } from '../components/DragContext'

const GRABBING_CURSOR_DELAY = 50

export function useSortable(id: string) {
  const instanceId = useContext(DragInstanceContext)
  const [handle, setHandle] = useState<HTMLElement | null>(null)
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [preview, setPreview] = useState<HTMLElement>()
  const grabbingTimer = useRef<number>(undefined)

  // 卡片元素和六点拖拽手柄都拿到后，才告诉 Atlaskit：从手柄可以拖动，整张卡片可以接收放置。
  useEffect(() => {
    if (!handle || !node) return
    const cleanup = combine(
      draggable({
        element: node,
        dragHandle: handle,
        getInitialData: () => ({ id, instanceId }),
        onGenerateDragPreview({ nativeSetDragImage, location }) {
          setCustomNativeDragPreview({
            getOffset: preserveOffsetOnSource({ element: node, input: location.current.input }),
            render({ container }) {
              container.style.width = `${node.clientWidth}px`
              window.clearTimeout(grabbingTimer.current)
              grabbingTimer.current = window.setTimeout(
                () => document.documentElement.classList.add('grabbing'),
                GRABBING_CURSOR_DELAY,
              )
              setPreview(container)
            },
            nativeSetDragImage,
          })
        },
        onDrop: () => {
          window.clearTimeout(grabbingTimer.current)
          document.documentElement.classList.remove('grabbing')
          setPreview(undefined)
        },
      }),
      dropTargetForElements({
        element: node,
        getData: () => ({ id }),
        getIsSticky: () => true,
        // instanceId 相同才是同一块看板里的卡片，其他拖拽区域经过这里时不能放下。
        canDrop: ({ source }) => source.data.instanceId === instanceId,
      }),
    )
    return () => {
      cleanup()
      window.clearTimeout(grabbingTimer.current)
      document.documentElement.classList.remove('grabbing')
    }
  }, [handle, id, instanceId, node])
  return { dragging: !!preview, preview, setHandle, setNode }
}
