'use client'
import { Progress } from '@ark-ui/react/progress'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { progress, type ProgressVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(progress)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Progress.Root, ProgressVariantProps> = withProvider(
  Progress.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Progress.RootProvider, ProgressVariantProps> =
  withProvider(Progress.RootProvider, 'root')
export const Label = withContext(Progress.Label, 'label')
export const Range = withContext(Progress.Range, 'range')
export const Track = withContext(Progress.Track, 'track')
export const ValueText = withContext(Progress.ValueText, 'valueText')
export const View = withContext(Progress.View, 'view')

export {
  ProgressContext as Context,
  useProgress,
  type UseProgressProps,
  type UseProgressReturn,
} from '@ark-ui/react/progress'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type LabelProps = ComponentProps<typeof Label>
export type RangeProps = ComponentProps<typeof Range>
export type TrackProps = ComponentProps<typeof Track>
export type ValueTextProps = ComponentProps<typeof ValueText>
export type ViewProps = ComponentProps<typeof View>

export {
  useProgressContext,
  type ProgressValueChangeDetails as ValueChangeDetails,
  type ProgressValueTranslationDetails as ValueTranslationDetails,
} from '@ark-ui/react/progress'
