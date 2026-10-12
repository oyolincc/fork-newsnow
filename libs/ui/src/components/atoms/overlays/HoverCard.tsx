'use client'
import { HoverCard } from '@ark-ui/react/hover-card'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { hoverCard } from 'styled-system/recipes'

const { withRootProvider, withContext } = createSlotRecipeContext(hoverCard)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider(HoverCard.Root)
export const RootProvider = withRootProvider(HoverCard.RootProvider)
export const Arrow = withContext(HoverCard.Arrow, 'arrow')
export const ArrowTip = withContext(HoverCard.ArrowTip, 'arrowTip')
export const Content = withContext(HoverCard.Content, 'content')
export const Positioner = withContext(HoverCard.Positioner, 'positioner')
export const Trigger = withContext(HoverCard.Trigger, 'trigger')

export { HoverCardContext as Context } from '@ark-ui/react/hover-card'

export {
  useHoverCard,
  type UseHoverCardProps,
  type UseHoverCardReturn,
} from '@ark-ui/react/hover-card'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ArrowProps = ComponentProps<typeof Arrow>
export type ArrowTipProps = ComponentProps<typeof ArrowTip>
export type ContentProps = ComponentProps<typeof Content>
export type PositionerProps = ComponentProps<typeof Positioner>
export type TriggerProps = ComponentProps<typeof Trigger>

export {
  useHoverCardContext,
  type HoverCardOpenChangeDetails as OpenChangeDetails,
  type HoverCardTriggerValueChangeDetails as TriggerValueChangeDetails,
} from '@ark-ui/react/hover-card'
