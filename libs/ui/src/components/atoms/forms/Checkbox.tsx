'use client'
import { Checkbox, useCheckboxContext } from '@ark-ui/react/checkbox'
import { ark } from '@ark-ui/react/factory'
import { type ComponentProps, forwardRef, type ReactElement } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { checkbox, type CheckboxVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(checkbox)

export type RootProps = ComponentProps<typeof Root>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>

export const Root: StyledComponent<typeof Checkbox.Root, CheckboxVariantProps> = withProvider(
  Checkbox.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Checkbox.RootProvider, CheckboxVariantProps> =
  withProvider(Checkbox.RootProvider, 'root')
export const Group: StyledComponent<typeof Checkbox.Group, CheckboxVariantProps> = withProvider(
  Checkbox.Group,
  'group',
)
export const Label = withContext(Checkbox.Label, 'label')
export const HiddenInput = Checkbox.HiddenInput

export {
  CheckboxContext as Context,
  type CheckboxCheckedState as CheckedState,
  CheckboxGroupProvider as GroupProvider,
} from '@ark-ui/react/checkbox'

const StyledIndicator: StyledComponent<typeof ark.svg> = withContext(ark.svg, 'indicator')

export interface IndicatorProps extends ComponentProps<typeof StyledIndicator> {
  checked?: ReactElement | undefined
  indeterminate?: ReactElement | undefined
}

export const Indicator = forwardRef<SVGSVGElement, IndicatorProps>(function Indicator(props, ref) {
  const { checked, indeterminate, children, asChild, ...rest } = props
  const api = useCheckboxContext()
  const customIcon = api.indeterminate ? indeterminate : api.checked ? checked : undefined

  return (
    <Checkbox.Indicator indeterminate={api.indeterminate} asChild>
      <StyledIndicator
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3px"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
        asChild={Boolean(customIcon) || asChild}>
        {customIcon !== undefined ? (
          customIcon
        ) : children !== undefined || asChild ? (
          children
        ) : (
          <>
            <title>Checkmark</title>
            {api.indeterminate ? (
              <path d="M5 12h14" />
            ) : api.checked ? (
              <path d="M20 6 9 17l-5-5" />
            ) : null}
          </>
        )}
      </StyledIndicator>
    </Checkbox.Indicator>
  )
})

export const Control = withContext(Checkbox.Control, 'control', {
  defaultProps: { children: <Indicator /> },
})
export type ControlProps = ComponentProps<typeof Control>

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type GroupProps = ComponentProps<typeof Group>
export type LabelProps = ComponentProps<typeof Label>

export {
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
  type UseCheckboxProps,
  type UseCheckboxReturn,
  type CheckboxCheckedChangeDetails as CheckedChangeDetails,
} from '@ark-ui/react/checkbox'

export { type UseCheckboxGroupProps, type UseCheckboxGroupReturn } from '@ark-ui/react/checkbox'
