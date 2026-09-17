import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import type {
  AllEvents,
  ElementDragType,
} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types'
import { createContext, useEffect, useState, type PropsWithChildren } from 'react'

export const DragInstanceContext = createContext<string | null>(null)

export function DragContext({
  children,
  onDropTargetChange,
  scrollElement,
}: PropsWithChildren<{
  onDropTargetChange: AllEvents<ElementDragType>['onDropTargetChange']
  scrollElement?: HTMLElement
}>) {
  const [instanceId] = useState(() => crypto.randomUUID())

  // 每块看板生成一个随机 ID，拖动卡片时会带上它；只有 ID 相同的卡片之间才能交换位置。
  useEffect(
    () =>
      combine(
        monitorForElements({
          canMonitor: ({ source }) => source.data.instanceId === instanceId,
          onDropTargetChange,
        }),
        scrollElement ? autoScrollForElements({ element: scrollElement }) : () => undefined,
      ),
    [instanceId, onDropTargetChange, scrollElement],
  )
  return <DragInstanceContext.Provider value={instanceId}>{children}</DragInstanceContext.Provider>
}
