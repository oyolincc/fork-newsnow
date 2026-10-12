'use client'
import { SegmentGroup } from '@ark-ui/react/segment-group'
import { type ComponentProps, type ReactNode } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { segmentGroup, type SegmentGroupVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(segmentGroup)

export type RootProps = ComponentProps<typeof Root>

export const Root: StyledComponent<typeof SegmentGroup.Root, SegmentGroupVariantProps> =
  withProvider(SegmentGroup.Root, 'root', {
    defaultProps: { orientation: 'horizontal' },
    forwardProps: ['orientation'],
  })
export const RootProvider: StyledComponent<
  typeof SegmentGroup.RootProvider,
  SegmentGroupVariantProps
> = withProvider(SegmentGroup.RootProvider, 'root')
export const Indicator = withContext(SegmentGroup.Indicator, 'indicator')
export const Item = withContext(SegmentGroup.Item, 'item')
export const ItemControl = withContext(SegmentGroup.ItemControl, 'itemControl')
export const ItemHiddenInput = SegmentGroup.ItemHiddenInput
export const ItemText = withContext(SegmentGroup.ItemText, 'itemText')
export const Label = withContext(SegmentGroup.Label, 'label')

export { SegmentGroupContext as Context } from '@ark-ui/react/segment-group'

interface Item {
  value: string
  label: ReactNode
  disabled?: boolean | undefined
}

export type ItemProps = ComponentProps<typeof Item>

export interface ItemsProps extends Omit<ItemProps, 'value'> {
  items: Array<string | Item>
}

export const Items = (props: ItemsProps) => {
  const { items, ...itemProps } = props
  const data = items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item))

  return data.map((item) => (
    <Item key={item.value} value={item.value} disabled={item.disabled} {...itemProps}>
      <ItemText>{item.label}</ItemText>
      <ItemHiddenInput />
    </Item>
  ))
}

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type ItemControlProps = ComponentProps<typeof ItemControl>
export type ItemHiddenInputProps = ComponentProps<typeof ItemHiddenInput>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type LabelProps = ComponentProps<typeof Label>

export {
  useSegmentGroup,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
  type UseSegmentGroupProps,
  type UseSegmentGroupReturn,
  type SegmentGroupValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/segment-group'
