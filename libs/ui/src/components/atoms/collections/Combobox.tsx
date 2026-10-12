'use client'
import type { Assign } from '@ark-ui/react'
import type { CollectionItem } from '@ark-ui/react/collection'
import {
  Combobox,
  type ComboboxRootProps,
  type ComboboxRootProviderProps,
} from '@ark-ui/react/combobox'
import { ark } from '@ark-ui/react/factory'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { type ComponentProps, type RefAttributes } from 'react'
import { createSlotRecipeContext, type HTMLStyledProps } from 'styled-system/jsx'
import { type ComboboxVariantProps, combobox } from 'styled-system/recipes'

const { withProvider, withContext } = createSlotRecipeContext(combobox)

type StyleProps = HTMLStyledProps<'div'> & ComboboxVariantProps

export type RootProps<T extends CollectionItem = CollectionItem> = Assign<
  ComboboxRootProps<T>,
  StyleProps
> &
  RefAttributes<HTMLDivElement>
export type RootProviderProps<T extends CollectionItem = CollectionItem> = Assign<
  ComboboxRootProviderProps<T>,
  StyleProps
> &
  RefAttributes<HTMLDivElement>

export const Root = withProvider(Combobox.Root, 'root', {
  defaultProps: { positioning: { sameWidth: false } },
}) as Combobox.RootComponent<StyleProps>

export const RootProvider = withProvider(
  Combobox.RootProvider,
  'root',
) as Combobox.RootProviderComponent<StyleProps>

export const ClearTrigger = withContext(Combobox.ClearTrigger, 'clearTrigger', {
  defaultProps: { children: <XIcon /> },
})
export const Content = withContext(Combobox.Content, 'content')
export const Control = withContext(Combobox.Control, 'control')
export const Empty = withContext(Combobox.Empty, 'empty')
export const IndicatorGroup = withContext(ark.div, 'indicatorGroup')
export const Input = withContext(Combobox.Input, 'input')
export const Item = withContext(Combobox.Item, 'item')
export const ItemGroup = withContext(Combobox.ItemGroup, 'itemGroup')
export const ItemGroupLabel = withContext(Combobox.ItemGroupLabel, 'itemGroupLabel')
export const ItemText = withContext(Combobox.ItemText, 'itemText')
export const Label = withContext(Combobox.Label, 'label')
export const List = withContext(Combobox.List, 'list')
export const Positioner = withContext(Combobox.Positioner, 'positioner')
export const Trigger = withContext(Combobox.Trigger, 'trigger', {
  defaultProps: { children: <ChevronsUpDownIcon /> },
})

export { ComboboxContext as Context } from '@ark-ui/react/combobox'

export const ItemIndicator = withContext(Combobox.ItemIndicator, 'itemIndicator', {
  defaultProps: { children: <CheckIcon /> },
})

export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type ControlProps = ComponentProps<typeof Control>
export type EmptyProps = ComponentProps<typeof Empty>
export type IndicatorGroupProps = ComponentProps<typeof IndicatorGroup>
export type InputProps = ComponentProps<typeof Input>
export type ItemProps = ComponentProps<typeof Item>
export type ItemGroupProps = ComponentProps<typeof ItemGroup>
export type ItemGroupLabelProps = ComponentProps<typeof ItemGroupLabel>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type LabelProps = ComponentProps<typeof Label>
export type ListProps = ComponentProps<typeof List>
export type PositionerProps = ComponentProps<typeof Positioner>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>

export {
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
  type UseComboboxProps,
  type UseComboboxReturn,
  type ComboboxHighlightChangeDetails as HighlightChangeDetails,
  type ComboboxInputValueChangeDetails as InputValueChangeDetails,
  type ComboboxOpenChangeDetails as OpenChangeDetails,
  type ComboboxSelectionDetails as SelectionDetails,
  type ComboboxValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/combobox'
