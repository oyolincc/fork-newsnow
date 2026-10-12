'use client'
import { Field } from '@ark-ui/react/field'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext, styled } from 'styled-system/jsx'
import { field, input } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(field)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Field.Root> = withProvider(Field.Root, 'root')
export const RootProvider: StyledComponent<typeof Field.RootProvider> = withProvider(
  Field.RootProvider,
  'root',
)
export const Input = styled(Field.Input, input)
export const ErrorText = withContext(Field.ErrorText, 'errorText')
export const HelperText = withContext(Field.HelperText, 'helperText')
export const Label = withContext(Field.Label, 'label')
export const RequiredIndicator = withContext(Field.RequiredIndicator, 'requiredIndicator')

export { FieldContext as Context } from '@ark-ui/react/field'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type InputProps = ComponentProps<typeof Input>
export type ErrorTextProps = ComponentProps<typeof ErrorText>
export type HelperTextProps = ComponentProps<typeof HelperText>
export type LabelProps = ComponentProps<typeof Label>
export type RequiredIndicatorProps = ComponentProps<typeof RequiredIndicator>

export {
  useField,
  useFieldContext,
  type UseFieldProps,
  type UseFieldReturn,
} from '@ark-ui/react/field'
