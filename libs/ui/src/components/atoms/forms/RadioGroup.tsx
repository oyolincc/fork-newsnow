'use client'
import { ark } from '@ark-ui/react/factory'
import { RadioGroup } from '@ark-ui/react/radio-group'
import { type ComponentProps, forwardRef } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { radioGroup, type RadioGroupVariantProps } from 'styled-system/recipes'

import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(radioGroup)

export type RootProps = ComponentProps<typeof Root>
export type ItemProps = ComponentProps<typeof Item>

export const Root: StyledComponent<typeof RadioGroup.Root, RadioGroupVariantProps> = withProvider(
  RadioGroup.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof RadioGroup.RootProvider, RadioGroupVariantProps> =
  withProvider(RadioGroup.RootProvider, 'root')
export const Item = withContext(RadioGroup.Item, 'item')
export const ItemControl = withContext(RadioGroup.ItemControl, 'itemControl')
const StyledItemIndicator: StyledComponent<typeof ark.span> = withContext(ark.span, 'itemControl')
export type ItemIndicatorProps = ComponentProps<typeof StyledItemIndicator>
export const ItemIndicator = forwardRef<HTMLSpanElement, ItemIndicatorProps>(
  function ItemIndicator(props, ref) {
    return (
      <RadioGroup.ItemControl asChild>
        <StyledItemIndicator
          data-custom={props.children !== undefined || props.asChild ? '' : undefined}
          {...props}
          ref={ref}
        />
      </RadioGroup.ItemControl>
    )
  },
)
export const ItemText = withContext(RadioGroup.ItemText, 'itemText')
export const Label = withContext(RadioGroup.Label, 'label')
export const ItemHiddenInput = RadioGroup.ItemHiddenInput

export { RadioGroupContext as Context } from '@ark-ui/react/radio-group'

export {
  useRadioGroup,
  type UseRadioGroupProps,
  type UseRadioGroupReturn,
} from '@ark-ui/react/radio-group'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ItemControlProps = ComponentProps<typeof ItemControl>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type LabelProps = ComponentProps<typeof Label>
export type ItemHiddenInputProps = ComponentProps<typeof ItemHiddenInput>

export {
  useRadioGroupContext,
  useRadioGroupItemContext,
  RadioGroupItemContext as ItemContext,
  type RadioGroupValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/radio-group'
