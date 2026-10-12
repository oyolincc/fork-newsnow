'use client'
import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { tooltip } from 'styled-system/recipes'

const { withRootProvider, withContext } = createSlotRecipeContext(tooltip)

export const Root = withRootProvider(ArkTooltip.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const RootProvider = withRootProvider(ArkTooltip.RootProvider, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const Arrow = withContext(ArkTooltip.Arrow, 'arrow')
export const ArrowTip = withContext(ArkTooltip.ArrowTip, 'arrowTip')
export const Content = withContext(ArkTooltip.Content, 'content')
export const Positioner = withContext(ArkTooltip.Positioner, 'positioner')
export const Trigger = withContext(ArkTooltip.Trigger, 'trigger')

export type RootProps = ComponentProps<typeof Root>
export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ArrowProps = ComponentProps<typeof Arrow>
export type ArrowTipProps = ComponentProps<typeof ArrowTip>
export type ContentProps = ComponentProps<typeof Content>
export type PositionerProps = ComponentProps<typeof Positioner>
export type TriggerProps = ComponentProps<typeof Trigger>

export {
  TooltipContext as Context,
  useTooltip,
  useTooltipContext,
  type UseTooltipProps,
  type UseTooltipReturn,
  type TooltipOpenChangeDetails as OpenChangeDetails,
  type TooltipTriggerValueChangeDetails as TriggerValueChangeDetails,
} from '@ark-ui/react/tooltip'
