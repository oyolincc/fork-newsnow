'use client'
import { Portal } from '@ark-ui/react/portal'
import { forwardRef } from 'react'
import * as TooltipParts from './components/atoms/overlays/Tooltip'

export interface TooltipProps extends Omit<TooltipParts.RootProps, 'content'> {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  children: React.ReactNode | undefined
  content: React.ReactNode | string
  contentProps?: TooltipParts.ContentProps
  disabled?: boolean
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(props, ref) {
  const {
    showArrow,
    children,
    disabled,
    portalled = true,
    content,
    contentProps,
    portalRef,
    ...rootProps
  } = props

  if (disabled) return children

  return (
    <TooltipParts.Root {...rootProps}>
      <TooltipParts.Trigger asChild>{children}</TooltipParts.Trigger>
      <Portal disabled={!portalled} container={portalRef}>
        <TooltipParts.Positioner>
          <TooltipParts.Content ref={ref} {...contentProps}>
            {showArrow && (
              <TooltipParts.Arrow>
                <TooltipParts.ArrowTip />
              </TooltipParts.Arrow>
            )}
            {content}
          </TooltipParts.Content>
        </TooltipParts.Positioner>
      </Portal>
    </TooltipParts.Root>
  )
})
