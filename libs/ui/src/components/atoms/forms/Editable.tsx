'use client'
import { Editable } from '@ark-ui/react/editable'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { editable, type EditableVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(editable)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Editable.Root, EditableVariantProps> = withProvider(
  Editable.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Editable.RootProvider, EditableVariantProps> =
  withProvider(Editable.RootProvider, 'root')
export const Area = withContext(Editable.Area, 'area')
export const CancelTrigger = withContext(Editable.CancelTrigger, 'cancelTrigger')
export const Control = withContext(Editable.Control, 'control')
export const EditTrigger = withContext(Editable.EditTrigger, 'editTrigger')
export const Input = withContext(Editable.Input, 'input')
export const Label = withContext(Editable.Label, 'label')
export const Preview = withContext(Editable.Preview, 'preview')
export const SubmitTrigger = withContext(Editable.SubmitTrigger, 'submitTrigger')

export { EditableContext as Context } from '@ark-ui/react/editable'

export { useEditable, type UseEditableProps, type UseEditableReturn } from '@ark-ui/react/editable'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type AreaProps = ComponentProps<typeof Area>
export type CancelTriggerProps = ComponentProps<typeof CancelTrigger>
export type ControlProps = ComponentProps<typeof Control>
export type EditTriggerProps = ComponentProps<typeof EditTrigger>
export type InputProps = ComponentProps<typeof Input>
export type LabelProps = ComponentProps<typeof Label>
export type PreviewProps = ComponentProps<typeof Preview>
export type SubmitTriggerProps = ComponentProps<typeof SubmitTrigger>

export {
  useEditableContext,
  type EditableEditChangeDetails as EditChangeDetails,
  type EditableValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/editable'
