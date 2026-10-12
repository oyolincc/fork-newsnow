'use client'
import { Progress } from '@ark-ui/react/progress'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { progressCircle, type ProgressCircleVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(progressCircle)

export const Root: StyledComponent<typeof Progress.Root, ProgressCircleVariantProps> = withProvider(
  Progress.Root,
  'root',
)
export const RootProvider: StyledComponent<
  typeof Progress.RootProvider,
  ProgressCircleVariantProps
> = withProvider(Progress.RootProvider, 'root')
export const Circle = withContext(Progress.Circle, 'circle')
export const Track = withContext(Progress.CircleTrack, 'circleTrack')
export const Range = withContext(Progress.CircleRange, 'circleRange')
export const Label = withContext(Progress.Label, 'label')
export const ValueText = withContext(Progress.ValueText, 'valueText')

export type RootProps = ComponentProps<typeof Root>
export type RootProviderProps = ComponentProps<typeof RootProvider>
export type CircleProps = ComponentProps<typeof Circle>
export type TrackProps = ComponentProps<typeof Track>
export type RangeProps = ComponentProps<typeof Range>
export type LabelProps = ComponentProps<typeof Label>
export type ValueTextProps = ComponentProps<typeof ValueText>

export {
  ProgressContext as Context,
  useProgress,
  useProgressContext,
  type UseProgressProps,
  type UseProgressReturn,
  type ProgressValueChangeDetails as ValueChangeDetails,
  type ProgressValueTranslationDetails as ValueTranslationDetails,
} from '@ark-ui/react/progress'
