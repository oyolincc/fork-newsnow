'use client'
import { ark } from '@ark-ui/react/factory'
import { Slider, useSliderContext } from '@ark-ui/react/slider'
import { type ComponentProps, forwardRef } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { slider, type SliderVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(slider)

export const Root: StyledComponent<typeof Slider.Root, SliderVariantProps> = withProvider(
  Slider.Root,
  'root',
  { forwardProps: ['orientation'] },
)
export const RootProvider: StyledComponent<typeof Slider.RootProvider, SliderVariantProps> =
  withProvider(Slider.RootProvider, 'root')
export const Control = withContext(Slider.Control, 'control')
export const DraggingIndicator = withContext(Slider.DraggingIndicator, 'draggingIndicator')
export const Label = withContext(Slider.Label, 'label')
export const Marker = withContext(Slider.Marker, 'marker')
export const MarkerIndicator = withContext(ark.div, 'markerIndicator')
export const MarkerGroup = withContext(Slider.MarkerGroup, 'markerGroup')
export const Range = withContext(Slider.Range, 'range')
export const Thumb = withContext(Slider.Thumb, 'thumb')
export const Track = withContext(Slider.Track, 'track')
export const ValueText = withContext(Slider.ValueText, 'valueText')
export const HiddenInput = Slider.HiddenInput

export { SliderContext as Context } from '@ark-ui/react/slider'

export type RootProps = ComponentProps<typeof Root>
export type MarkerGroupProps = ComponentProps<typeof MarkerGroup>
export type ThumbProps = ComponentProps<typeof Thumb>

export interface MarksProps extends MarkerGroupProps {
  marks?: Array<number | { value: number; label: React.ReactNode }> | undefined
}

export const Marks = forwardRef<HTMLDivElement, MarksProps>(function Marks(props, ref) {
  const { marks, ...rest } = props
  if (!marks?.length) return null

  return (
    <MarkerGroup ref={ref} {...rest}>
      {marks.map((mark, index) => {
        const value = typeof mark === 'number' ? mark : mark.value
        const label = typeof mark === 'number' ? undefined : mark.label
        return (
          <Marker key={index} value={value}>
            <MarkerIndicator />
            {label != null && <span>{label}</span>}
          </Marker>
        )
      })}
    </MarkerGroup>
  )
})

export const Thumbs = (props: Omit<ThumbProps, 'index'>) => {
  const slider = useSliderContext()
  return slider.value.map((_, index) => (
    <Thumb key={index} index={index} {...props}>
      <HiddenInput />
    </Thumb>
  ))
}

export { useSlider, type UseSliderProps, type UseSliderReturn } from '@ark-ui/react/slider'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ControlProps = ComponentProps<typeof Control>
export type DraggingIndicatorProps = ComponentProps<typeof DraggingIndicator>
export type LabelProps = ComponentProps<typeof Label>
export type MarkerProps = ComponentProps<typeof Marker>
export type MarkerIndicatorProps = ComponentProps<typeof MarkerIndicator>
export type RangeProps = ComponentProps<typeof Range>
export type TrackProps = ComponentProps<typeof Track>
export type ValueTextProps = ComponentProps<typeof ValueText>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>
export type ThumbsProps = ComponentProps<typeof Thumbs>

export {
  useSliderContext,
  type SliderFocusChangeDetails as FocusChangeDetails,
  type SliderValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/slider'
