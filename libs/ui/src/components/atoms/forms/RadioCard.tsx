'use client'
import { ark } from '@ark-ui/react/factory'
import { RadioGroup, useRadioGroupItemContext } from '@ark-ui/react/radio-group'
import { type ComponentProps, forwardRef, type ReactElement } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { radioCard, type RadioCardVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(radioCard)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof RadioGroup.Root, RadioCardVariantProps> = withProvider(
  RadioGroup.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof RadioGroup.RootProvider, RadioCardVariantProps> =
  withProvider(RadioGroup.RootProvider, 'root')
export const Item = withContext(RadioGroup.Item, 'item')
const StyledItemControl: StyledComponent<typeof ark.div> = withContext(ark.div, 'itemControl')
export type ItemControlProps = ComponentProps<typeof StyledItemControl>

export const ItemControl = forwardRef<HTMLDivElement, ItemControlProps>(
  function ItemControl(props, ref) {
    const item = useRadioGroupItemContext()
    return (
      <StyledItemControl
        data-scope="radio-card"
        data-part="item-control"
        data-state={item.checked ? 'checked' : 'unchecked'}
        data-focus={item.focused ? '' : undefined}
        data-disabled={item.disabled ? '' : undefined}
        data-hover={item.hovered ? '' : undefined}
        data-active={item.active ? '' : undefined}
        data-invalid={item.invalid ? '' : undefined}
        {...props}
        ref={ref}
      />
    )
  },
)
export const ItemContent = withContext(ark.div, 'itemContent')
export const ItemDescription = withContext(ark.div, 'itemDescription')
export const ItemAddon = withContext(ark.div, 'itemAddon')
export const ItemText = withContext(RadioGroup.ItemText, 'itemText')
export const Label = withContext(RadioGroup.Label, 'label')
export const ItemHiddenInput = RadioGroup.ItemHiddenInput

export {
  RadioGroupContext as Context,
  RadioGroupItemContext as ItemContext,
} from '@ark-ui/react/radio-group'

const StyledItemIndicator: StyledComponent<typeof ark.span> = withContext(ark.span, 'itemIndicator')

export interface ItemIndicatorProps extends ComponentProps<typeof StyledItemIndicator> {
  checked?: ReactElement | undefined
}

export const ItemIndicator = forwardRef<HTMLSpanElement, ItemIndicatorProps>(function ItemIndicator(
  { checked, children, asChild, ...props },
  ref,
) {
  const item = useRadioGroupItemContext()
  const customChecked = item.checked && checked !== undefined
  return (
    <StyledItemIndicator
      data-scope="radio-card"
      data-part="item-indicator"
      data-state={item.checked ? 'checked' : 'unchecked'}
      data-disabled={item.disabled ? '' : undefined}
      data-invalid={item.invalid ? '' : undefined}
      data-custom={customChecked || children !== undefined || asChild ? '' : undefined}
      aria-hidden="true"
      {...props}
      ref={ref}
      asChild={asChild || customChecked}>
      {customChecked ? checked : children}
    </StyledItemIndicator>
  )
})

export {
  useRadioGroup,
  type UseRadioGroupProps,
  type UseRadioGroupReturn,
  type RadioGroupValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/radio-group'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ItemProps = ComponentProps<typeof Item>
export type ItemContentProps = ComponentProps<typeof ItemContent>
export type ItemDescriptionProps = ComponentProps<typeof ItemDescription>
export type ItemAddonProps = ComponentProps<typeof ItemAddon>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type LabelProps = ComponentProps<typeof Label>
export type ItemHiddenInputProps = ComponentProps<typeof ItemHiddenInput>
