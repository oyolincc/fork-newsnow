'use client'
import { ark } from '@ark-ui/react/factory'
import { Field as ArkField, useFieldContext } from '@ark-ui/react/field'
import { ChevronDownIcon } from 'lucide-react'
import { createContext, forwardRef, useContext, type ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { nativeSelect, type NativeSelectVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(nativeSelect)
const StateContext = createContext({ disabled: false, invalid: false })
const StyledRoot: StyledComponent<typeof ark.div, NativeSelectVariantProps> = withProvider(
  ark.div,
  'root',
)
const StyledField = withContext(ArkField.Select, 'field')
const StyledIndicator: StyledComponent<typeof ark.div> = withContext(ark.div, 'indicator')

export interface RootProps extends ComponentProps<typeof StyledRoot> {
  disabled?: boolean
  invalid?: boolean
}
export const Root = forwardRef<HTMLDivElement, RootProps>(function Root(
  { disabled, invalid, ...props },
  ref,
) {
  const field = useFieldContext()
  const state = {
    disabled: Boolean(disabled || field?.disabled),
    invalid: Boolean(invalid || field?.invalid),
  }
  return (
    <StateContext.Provider value={state}>
      <StyledRoot
        {...props}
        data-disabled={state.disabled ? '' : undefined}
        data-invalid={state.invalid ? '' : undefined}
        ref={ref}
      />
    </StateContext.Provider>
  )
})

export interface FieldProps extends Omit<ComponentProps<typeof StyledField>, 'size'> {
  placeholder?: string
}
export const Field = forwardRef<HTMLSelectElement, FieldProps>(function Field(
  { placeholder, children, ...props },
  ref,
) {
  const { disabled, invalid } = useContext(StateContext)
  return (
    <StyledField
      data-invalid={invalid ? '' : undefined}
      aria-invalid={invalid || undefined}
      {...props}
      disabled={Boolean(disabled || props.disabled)}
      ref={ref}>
      {placeholder != null && <option value="">{placeholder}</option>}
      {children}
    </StyledField>
  )
})

export interface IndicatorProps extends ComponentProps<typeof StyledIndicator> {}
export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(function Indicator(
  { children, ...props },
  ref,
) {
  const { disabled, invalid } = useContext(StateContext)
  return (
    <StyledIndicator
      {...props}
      ref={ref}
      aria-hidden="true"
      data-disabled={disabled ? '' : undefined}
      data-invalid={invalid ? '' : undefined}>
      {children == null ? <ChevronDownIcon /> : children}
    </StyledIndicator>
  )
})
