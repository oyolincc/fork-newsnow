'use client'
import type { Assign } from '@ark-ui/react'
import type { CollectionItem } from '@ark-ui/react/collection'
import { ark } from '@ark-ui/react/factory'
import { Select, type SelectRootProps, type SelectRootProviderProps } from '@ark-ui/react/select'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { type ComponentProps, type RefAttributes } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { type SelectVariantProps, select } from 'styled-system/recipes'
import type { HTMLStyledProps } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(select)

type StyleProps = SelectVariantProps & HTMLStyledProps<'div'>

export type RootProps<T extends CollectionItem = CollectionItem> = Assign<
  SelectRootProps<T>,
  StyleProps
> &
  RefAttributes<HTMLDivElement>
export type RootProviderProps<T extends CollectionItem = CollectionItem> = Assign<
  SelectRootProviderProps<T>,
  StyleProps
> &
  RefAttributes<HTMLDivElement>

export const Root = withProvider(Select.Root, 'root') as Select.RootComponent<StyleProps>
export const RootProvider = withProvider(
  Select.RootProvider,
  'root',
) as Select.RootProviderComponent<StyleProps>

export const ClearTrigger = withContext(Select.ClearTrigger, 'clearTrigger')
export const Content = withContext(Select.Content, 'content')
export const Control = withContext(Select.Control, 'control')
export const IndicatorGroup = withContext(ark.div, 'indicatorGroup')
export const Item = withContext(Select.Item, 'item')
export const ItemGroup = withContext(Select.ItemGroup, 'itemGroup')
export const ItemGroupLabel = withContext(Select.ItemGroupLabel, 'itemGroupLabel')
export const ItemText = withContext(Select.ItemText, 'itemText')
export const Label = withContext(Select.Label, 'label')
export const List = withContext(Select.List, 'list')
export const Positioner = withContext(Select.Positioner, 'positioner')
export const Trigger = withContext(Select.Trigger, 'trigger')
export const ValueText = withContext(Select.ValueText, 'valueText')
export const Indicator = withContext(Select.Indicator, 'indicator', {
  defaultProps: { children: <ChevronsUpDownIcon /> },
})
export const HiddenSelect = Select.HiddenSelect

export {
  SelectContext as Context,
  SelectItemContext as ItemContext,
  type SelectValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/select'

export const ItemIndicator = withContext(Select.ItemIndicator, 'itemIndicator', {
  defaultProps: { children: <CheckIcon /> },
})

export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type ControlProps = ComponentProps<typeof Control>
export type IndicatorGroupProps = ComponentProps<typeof IndicatorGroup>
export type ItemProps = ComponentProps<typeof Item>
export type ItemGroupProps = ComponentProps<typeof ItemGroup>
export type ItemGroupLabelProps = ComponentProps<typeof ItemGroupLabel>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type LabelProps = ComponentProps<typeof Label>
export type ListProps = ComponentProps<typeof List>
export type PositionerProps = ComponentProps<typeof Positioner>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ValueTextProps = ComponentProps<typeof ValueText>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type HiddenSelectProps = ComponentProps<typeof HiddenSelect>
export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>

export {
  useSelect,
  useSelectContext,
  useSelectItemContext,
  type UseSelectProps,
  type UseSelectReturn,
  type SelectHighlightChangeDetails as HighlightChangeDetails,
  type SelectOpenChangeDetails as OpenChangeDetails,
  type SelectScrollToIndexDetails as ScrollToIndexDetails,
  type SelectSelectionDetails as SelectionDetails,
} from '@ark-ui/react/select'
