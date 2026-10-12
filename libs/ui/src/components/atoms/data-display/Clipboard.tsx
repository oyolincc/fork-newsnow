'use client'
import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { type ComponentProps, forwardRef } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { clipboard, type ClipboardVariantProps } from 'styled-system/recipes'

import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(clipboard)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Clipboard.Root, ClipboardVariantProps> = withProvider(
  Clipboard.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Clipboard.RootProvider, ClipboardVariantProps> =
  withProvider(Clipboard.RootProvider, 'root')
export const Control = withContext(Clipboard.Control, 'control')
export const Input = withContext(Clipboard.Input, 'input')
export const Label = withContext(Clipboard.Label, 'label')
export const Trigger = withContext(Clipboard.Trigger, 'trigger')
export const ValueText = withContext(Clipboard.ValueText, 'valueText')

export { ClipboardContext as Context } from '@ark-ui/react/clipboard'

export interface IndicatorProps extends ComponentProps<typeof StyledIndicator> {}

const StyledIndicator: StyledComponent<typeof Clipboard.Indicator> = withContext(
  Clipboard.Indicator,
  'indicator',
)

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(function Indicator(
  { children, ...props },
  ref,
) {
  return (
    <StyledIndicator ref={ref} copied={<CheckIcon />} {...props}>
      {children == null ? <CopyIcon /> : children}
    </StyledIndicator>
  )
})

export const CopyText = forwardRef<HTMLDivElement, IndicatorProps>(function CopyText(
  { children, ...props },
  ref,
) {
  return (
    <StyledIndicator ref={ref} copied="Copied" {...props}>
      {children == null ? 'Copy' : children}
    </StyledIndicator>
  )
})

export type RootProviderProps = ComponentProps<typeof RootProvider>

export type ControlProps = ComponentProps<typeof Control>

export type InputProps = ComponentProps<typeof Input>

export type LabelProps = ComponentProps<typeof Label>

export type TriggerProps = ComponentProps<typeof Trigger>

export type ValueTextProps = ComponentProps<typeof ValueText>

export {
  useClipboard,
  useClipboardContext,
  type UseClipboardProps,
  type UseClipboardReturn,
  type ClipboardCopyStatusDetails as CopyStatusDetails,
  type ClipboardValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/clipboard'

export type CopyTextProps = IndicatorProps
