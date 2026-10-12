'use client'
import { ark } from '@ark-ui/react/factory'
import { Switch, useSwitchContext } from '@ark-ui/react/switch'
import { type ComponentProps, forwardRef, type ReactNode } from 'react'
import { createSlotRecipeContext, styled } from 'styled-system/jsx'
import { switchRecipe, type SwitchRecipeVariantProps } from 'styled-system/recipes'

import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(switchRecipe)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Switch.Root, SwitchRecipeVariantProps> = withProvider(
  Switch.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Switch.RootProvider, SwitchRecipeVariantProps> =
  withProvider(Switch.RootProvider, 'root')
export const Label = withContext(Switch.Label, 'label')
export const Thumb = withContext(Switch.Thumb, 'thumb')
export const HiddenInput = Switch.HiddenInput

export const Control = withContext(Switch.Control, 'control', {
  defaultProps: { children: <Thumb /> },
})

export { SwitchContext as Context } from '@ark-ui/react/switch'

export interface IndicatorProps extends ComponentProps<typeof StyledIndicator> {
  fallback?: ReactNode | undefined
}

const StyledIndicator = withContext(ark.span, 'indicator')
export const Indicator = forwardRef<HTMLSpanElement, IndicatorProps>(
  function Indicator(props, ref) {
    const { fallback, children, ...rest } = props
    const api = useSwitchContext()
    return (
      <StyledIndicator ref={ref} data-checked={api.checked ? '' : undefined} {...rest}>
        {api.checked ? children : fallback}
      </StyledIndicator>
    )
  },
)

export interface ThumbIndicatorProps extends ComponentProps<typeof StyledThumbIndicator> {
  fallback?: React.ReactNode | undefined
}

const StyledThumbIndicator = styled(ark.span)
export const ThumbIndicator = forwardRef<HTMLSpanElement, ThumbIndicatorProps>(
  function SwitchThumbIndicator(props, ref) {
    const { fallback, children, ...rest } = props
    const api = useSwitchContext()
    return (
      <StyledThumbIndicator ref={ref} data-checked={api.checked ? '' : undefined} {...rest}>
        {api.checked ? children : fallback}
      </StyledThumbIndicator>
    )
  },
)

export { useSwitch, type UseSwitchProps, type UseSwitchReturn } from '@ark-ui/react/switch'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type LabelProps = ComponentProps<typeof Label>
export type ThumbProps = ComponentProps<typeof Thumb>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>
export type ControlProps = ComponentProps<typeof Control>

export {
  useSwitchContext,
  type SwitchCheckedChangeDetails as CheckedChangeDetails,
} from '@ark-ui/react/switch'
