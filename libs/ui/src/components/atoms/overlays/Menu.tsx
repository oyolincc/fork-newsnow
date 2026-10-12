'use client'
import { Menu } from '@ark-ui/react/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { menu } from 'styled-system/recipes'

const { withRootProvider, withContext } = createSlotRecipeContext(menu)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider(Menu.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const RootProvider = withRootProvider(Menu.RootProvider, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const Arrow = withContext(Menu.Arrow, 'arrow')
export const ArrowTip = withContext(Menu.ArrowTip, 'arrowTip')
export const CheckboxItem = withContext(Menu.CheckboxItem, 'item')
export const Content = withContext(Menu.Content, 'content')
export const ContextTrigger = withContext(Menu.ContextTrigger, 'contextTrigger')
export const Indicator = withContext(Menu.Indicator, 'indicator', {
  defaultProps: { children: <ChevronDownIcon /> },
})
export const Item = withContext(Menu.Item, 'item')
export const ItemGroup = withContext(Menu.ItemGroup, 'itemGroup')
export const ItemGroupLabel = withContext(Menu.ItemGroupLabel, 'itemGroupLabel')
export const ItemText = withContext(Menu.ItemText, 'itemText')
export const Positioner = withContext(Menu.Positioner, 'positioner')
export const RadioItem = withContext(Menu.RadioItem, 'item')
export const RadioItemGroup = withContext(Menu.RadioItemGroup, 'itemGroup')
export const Separator = withContext(Menu.Separator, 'separator')
export const Trigger = withContext(Menu.Trigger, 'trigger')
export const TriggerItem = withContext(Menu.TriggerItem, 'item')

export {
  MenuContext as Context,
  MenuItemContext as ItemContext,
  type MenuSelectionDetails as SelectionDetails,
} from '@ark-ui/react/menu'

export const ItemIndicator = withContext(Menu.ItemIndicator, 'itemIndicator', {
  defaultProps: { children: <CheckIcon /> },
})
export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>

export { useMenu, type UseMenuProps, type UseMenuReturn } from '@ark-ui/react/menu'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ArrowProps = ComponentProps<typeof Arrow>
export type ArrowTipProps = ComponentProps<typeof ArrowTip>
export type CheckboxItemProps = ComponentProps<typeof CheckboxItem>
export type ContentProps = ComponentProps<typeof Content>
export type ContextTriggerProps = ComponentProps<typeof ContextTrigger>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type ItemProps = ComponentProps<typeof Item>
export type ItemGroupProps = ComponentProps<typeof ItemGroup>
export type ItemGroupLabelProps = ComponentProps<typeof ItemGroupLabel>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type PositionerProps = ComponentProps<typeof Positioner>
export type RadioItemProps = ComponentProps<typeof RadioItem>
export type RadioItemGroupProps = ComponentProps<typeof RadioItemGroup>
export type SeparatorProps = ComponentProps<typeof Separator>
export type TriggerProps = ComponentProps<typeof Trigger>
export type TriggerItemProps = ComponentProps<typeof TriggerItem>

export {
  useMenuContext,
  useMenuItemContext,
  type MenuHighlightChangeDetails as HighlightChangeDetails,
  type MenuOpenChangeDetails as OpenChangeDetails,
  type MenuTriggerValueChangeDetails as TriggerValueChangeDetails,
  type MenuValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/menu'
