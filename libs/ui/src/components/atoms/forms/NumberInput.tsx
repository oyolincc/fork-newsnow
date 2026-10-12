'use client'
import { NumberInput } from '@ark-ui/react/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { numberInput, type NumberInputVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(numberInput)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof NumberInput.Root, NumberInputVariantProps> = withProvider(
  NumberInput.Root,
  'root',
)
export const RootProvider: StyledComponent<
  typeof NumberInput.RootProvider,
  NumberInputVariantProps
> = withProvider(NumberInput.RootProvider, 'root')
export const DecrementTrigger = withContext(NumberInput.DecrementTrigger, 'decrementTrigger', {
  defaultProps: { children: <ChevronDownIcon /> },
})
export const IncrementTrigger = withContext(NumberInput.IncrementTrigger, 'incrementTrigger', {
  defaultProps: { children: <ChevronUpIcon /> },
})
export const Input = withContext(NumberInput.Input, 'input')
export const Label = withContext(NumberInput.Label, 'label')
export const Scrubber = withContext(NumberInput.Scrubber, 'scrubber')
export const ValueText = withContext(NumberInput.ValueText, 'valueText')
export const Control = withContext(NumberInput.Control, 'control', {
  defaultProps: {
    children: (
      <>
        <IncrementTrigger />
        <DecrementTrigger />
      </>
    ),
  },
})

export { NumberInputContext as Context } from '@ark-ui/react/number-input'

export {
  useNumberInput,
  type UseNumberInputProps,
  type UseNumberInputReturn,
} from '@ark-ui/react/number-input'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type DecrementTriggerProps = ComponentProps<typeof DecrementTrigger>
export type IncrementTriggerProps = ComponentProps<typeof IncrementTrigger>
export type InputProps = ComponentProps<typeof Input>
export type LabelProps = ComponentProps<typeof Label>
export type ScrubberProps = ComponentProps<typeof Scrubber>
export type ValueTextProps = ComponentProps<typeof ValueText>
export type ControlProps = ComponentProps<typeof Control>

export {
  useNumberInputContext,
  type NumberInputFocusChangeDetails as FocusChangeDetails,
  type NumberInputValueChangeDetails as ValueChangeDetails,
  type NumberInputValueInvalidDetails as ValueInvalidDetails,
} from '@ark-ui/react/number-input'
