'use client'
import { ark } from '@ark-ui/react/factory'
import { Popover } from '@ark-ui/react/popover'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { popover } from 'styled-system/recipes'

const { withRootProvider, withContext } = createSlotRecipeContext(popover)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider(Popover.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const RootProvider = withRootProvider(Popover.RootProvider, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const Anchor = withContext(Popover.Anchor, 'anchor')
export const ArrowTip = withContext(Popover.ArrowTip, 'arrowTip')
export const Arrow = withContext(Popover.Arrow, 'arrow', {
  defaultProps: { children: <ArrowTip /> },
})
export const CloseTrigger = withContext(Popover.CloseTrigger, 'closeTrigger')
export const Content = withContext(Popover.Content, 'content')
export const Description = withContext(Popover.Description, 'description')
export const Indicator = withContext(Popover.Indicator, 'indicator')
export const Positioner = withContext(Popover.Positioner, 'positioner')
export const Title = withContext(Popover.Title, 'title')
export const Trigger = withContext(Popover.Trigger, 'trigger')

export const Body = withContext(ark.div, 'body')
export const Header = withContext(ark.div, 'header')
export const Footer = withContext(ark.div, 'footer')

export { PopoverContext as Context } from '@ark-ui/react/popover'

export { usePopover, type UsePopoverProps, type UsePopoverReturn } from '@ark-ui/react/popover'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type AnchorProps = ComponentProps<typeof Anchor>
export type ArrowTipProps = ComponentProps<typeof ArrowTip>
export type ArrowProps = ComponentProps<typeof Arrow>
export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type DescriptionProps = ComponentProps<typeof Description>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type PositionerProps = ComponentProps<typeof Positioner>
export type TitleProps = ComponentProps<typeof Title>
export type TriggerProps = ComponentProps<typeof Trigger>
export type BodyProps = ComponentProps<typeof Body>
export type HeaderProps = ComponentProps<typeof Header>
export type FooterProps = ComponentProps<typeof Footer>

export {
  usePopoverContext,
  type PopoverOpenChangeDetails as OpenChangeDetails,
  type PopoverTriggerValueChangeDetails as TriggerValueChangeDetails,
} from '@ark-ui/react/popover'
