'use client'
import { ColorPicker } from '@ark-ui/react/color-picker'
import { ark } from '@ark-ui/react/factory'
import { CheckIcon, PipetteIcon } from 'lucide-react'
import type { ComponentProps, Provider, JSX } from 'react'
import type { StyledComponent } from 'styled-system/types'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { colorPicker, type ColorPickerVariantProps } from 'styled-system/recipes'

const {
  withProvider,
  withContext,
  PropsProvider: ColorPropsProvider,
} = createSlotRecipeContext(colorPicker)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof ColorPicker.Root, ColorPickerVariantProps> = withProvider(
  ColorPicker.Root,
  'root',
)
export const RootProvider: StyledComponent<
  typeof ColorPicker.RootProvider,
  ColorPickerVariantProps
> = withProvider(ColorPicker.RootProvider, 'root')
export const AreaBackground = withContext(ColorPicker.AreaBackground, 'areaBackground')
export const AreaThumb = withContext(ColorPicker.AreaThumb, 'areaThumb')
export const ChannelInput = withContext(ColorPicker.ChannelInput, 'channelInput')
export const ChannelSliderLabel = withContext(ColorPicker.ChannelSliderLabel, 'channelSliderLabel')
export const ChannelSliderThumb = withContext(ColorPicker.ChannelSliderThumb, 'channelSliderThumb')
export const ChannelSliderTrack = withContext(ColorPicker.ChannelSliderTrack, 'channelSliderTrack')
export const ChannelSliderValueText = withContext(
  ColorPicker.ChannelSliderValueText,
  'channelSliderValueText',
)
export const Content = withContext(ColorPicker.Content, 'content')
export const Control = withContext(ColorPicker.Control, 'control')
export const EyeDropperTrigger = withContext(ColorPicker.EyeDropperTrigger, 'eyeDropperTrigger')
export const FormatSelect = withContext(ColorPicker.FormatSelect, 'formatSelect')
export const FormatTrigger = withContext(ColorPicker.FormatTrigger, 'formatTrigger')
export const HiddenInput = ColorPicker.HiddenInput
export const Label = withContext(ColorPicker.Label, 'label')
export const Positioner = withContext(ColorPicker.Positioner, 'positioner')
export const Swatch = withContext(ColorPicker.Swatch, 'swatch')
export const SwatchGroup = withContext(ColorPicker.SwatchGroup, 'swatchGroup')
export const SwatchIndicator = withContext(ColorPicker.SwatchIndicator, 'swatchIndicator', {
  defaultProps: { children: <CheckIcon /> },
})
export const SwatchTrigger = withContext(ColorPicker.SwatchTrigger, 'swatchTrigger')
export const TransparencyGrid = withContext(ColorPicker.TransparencyGrid, 'transparencyGrid')
export const ValueSwatch = withContext(ColorPicker.ValueSwatch, 'swatch')
export const ValueText = withContext(ColorPicker.ValueText, 'valueText')
export const View = withContext(ColorPicker.View, 'view')

export { ColorPickerContext as Context } from '@ark-ui/react/color-picker'
export const Area = withContext(ColorPicker.Area, 'area', {
  defaultProps: {
    children: (
      <>
        <AreaBackground />
        <AreaThumb />
      </>
    ),
  },
})
export const ChannelSlider = withContext(ColorPicker.ChannelSlider, 'channelSlider', {
  defaultProps: {
    children: (
      <>
        <TransparencyGrid size="0.6rem" />
        <ChannelSliderTrack />
        <ChannelSliderThumb />
      </>
    ),
  },
})
export const Trigger = withContext(ColorPicker.Trigger, 'trigger', {
  defaultProps: { children: <ValueSwatch /> },
})
export const Input = withContext(ColorPicker.ChannelInput, 'channelInput', {
  defaultProps: { channel: 'hex' },
}) as (props: InputProps) => JSX.Element
export const EyeDropper = withContext(ColorPicker.EyeDropperTrigger, 'eyeDropperTrigger', {
  defaultProps: { children: <PipetteIcon />, 'aria-label': 'Pick color from screen' },
})
export const Sliders = withContext(ark.div, 'sliders', {
  defaultProps: {
    children: (
      <>
        <ChannelSlider channel="hue" />
        <ChannelSlider channel="alpha" />
      </>
    ),
  },
})
export const ChannelText = withContext(ark.span, 'channelText')
export const PropsProvider = ColorPropsProvider as Provider<Partial<RootProps>>
export type RootProviderProps = ComponentProps<typeof RootProvider>
export type AreaProps = ComponentProps<typeof Area>
export type AreaBackgroundProps = ComponentProps<typeof AreaBackground>
export type AreaThumbProps = ComponentProps<typeof AreaThumb>
export type ChannelInputProps = ComponentProps<typeof ChannelInput>
export type ChannelSliderProps = ComponentProps<typeof ChannelSlider>
export type ChannelSliderLabelProps = ComponentProps<typeof ChannelSliderLabel>
export type ChannelSliderThumbProps = ComponentProps<typeof ChannelSliderThumb>
export type ChannelSliderTrackProps = ComponentProps<typeof ChannelSliderTrack>
export type ChannelSliderValueTextProps = ComponentProps<typeof ChannelSliderValueText>
export type ContentProps = ComponentProps<typeof Content>
export type ControlProps = ComponentProps<typeof Control>
export type EyeDropperTriggerProps = ComponentProps<typeof EyeDropperTrigger>
export type FormatSelectProps = ComponentProps<typeof FormatSelect>
export type FormatTriggerProps = ComponentProps<typeof FormatTrigger>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>
export type LabelProps = ComponentProps<typeof Label>
export type PositionerProps = ComponentProps<typeof Positioner>
export type SwatchProps = ComponentProps<typeof Swatch>
export type SwatchGroupProps = ComponentProps<typeof SwatchGroup>
export type SwatchIndicatorProps = ComponentProps<typeof SwatchIndicator>
export type SwatchTriggerProps = ComponentProps<typeof SwatchTrigger>
export type TransparencyGridProps = ComponentProps<typeof TransparencyGrid>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ValueSwatchProps = ComponentProps<typeof ValueSwatch>
export type ValueTextProps = ComponentProps<typeof ValueText>
export type ViewProps = ComponentProps<typeof View>
export interface InputProps extends Omit<ChannelInputProps, 'channel'> {}
export type EyeDropperProps = ComponentProps<typeof EyeDropper>
export type SlidersProps = ComponentProps<typeof Sliders>
export type ChannelTextProps = ComponentProps<typeof ChannelText>
export {
  useColorPicker,
  useColorPickerContext,
  type UseColorPickerProps,
  type UseColorPickerReturn,
  type ColorPickerValueChangeDetails as ValueChangeDetails,
  type ColorPickerColorFormat as ColorFormat,
  type ColorPickerFormatChangeDetails as FormatChangeDetails,
  type ColorPickerOpenChangeDetails as OpenChangeDetails,
} from '@ark-ui/react/color-picker'
const formatMap = {
  rgba: ['red', 'green', 'blue', 'alpha'],
  hsla: ['hue', 'saturation', 'lightness', 'alpha'],
  hsba: ['hue', 'saturation', 'brightness', 'alpha'],
  hexa: ['hex', 'alpha'],
} as const
export function getColorChannels<T extends keyof typeof formatMap>(
  format: T,
): (typeof formatMap)[T] {
  return formatMap[format]
}
