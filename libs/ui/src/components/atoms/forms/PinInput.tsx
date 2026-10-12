'use client'
import { PinInput } from '@ark-ui/react/pin-input'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { pinInput, type PinInputVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(pinInput)

export type RootProps = ComponentProps<typeof Root>
// Preserve Ark’s boolean mask prop without comparing Panda’s large CSS property union.
export const Root = withProvider(PinInput.Root, 'root', {
  forwardProps: ['mask'],
}) as unknown as StyledComponent<typeof PinInput.Root, PinInputVariantProps & { mask?: boolean }>
export const RootProvider: StyledComponent<typeof PinInput.RootProvider, PinInputVariantProps> =
  withProvider(PinInput.RootProvider, 'root')
export const Control = withContext(PinInput.Control, 'control')
export const HiddenInput = PinInput.HiddenInput
export const Input = withContext(PinInput.Input, 'input')
export const Label = withContext(PinInput.Label, 'label')

export { PinInputContext as Context } from '@ark-ui/react/pin-input'

export { usePinInput, type UsePinInputProps, type UsePinInputReturn } from '@ark-ui/react/pin-input'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ControlProps = ComponentProps<typeof Control>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>
export type InputProps = ComponentProps<typeof Input>
export type LabelProps = ComponentProps<typeof Label>

export {
  usePinInputContext,
  type PinInputValueChangeDetails as ValueChangeDetails,
  type PinInputValueInvalidDetails as ValueInvalidDetails,
} from '@ark-ui/react/pin-input'
