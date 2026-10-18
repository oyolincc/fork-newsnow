import { progressAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  root: { textStyle: 'sm' },
  label: { gap: '1' },
  valueText: { textStyle: 'xs', lineHeight: '1' },
} as const

const appearance = {
  circleTrack: { stroke: 'gray.bg.subtle' },
  circleRange: { stroke: 'colorPalette.bg.default' },
  label: { fontWeight: 'medium' },
  valueText: { fontWeight: 'medium' },
} as const

export const progressCircle = defineSlotRecipe({
  className: 'app-progress-circle',
  jsx: ['ProgressCircle.Root', 'ProgressCircle.RootProvider'],
  slots: progressAnatomy.keys(),
  base: {
    root: { position: 'relative' },
    circle: { _indeterminate: { animation: 'spin 2s linear infinite' } },
    circleRange: {
      transitionProperty: 'stroke-dashoffset, stroke-dasharray',
      transitionDuration: '0.6s',
      _indeterminate: { animation: 'circular-progress 1.5s linear infinite' },
    },
    label: { display: 'inline-flex', alignItems: 'center' },
  },
  variants: {
    variant: {
      solid: appearance,
      subtle: {
        ...appearance,
        circleTrack: { ...appearance.circleTrack, stroke: 'colorPalette.bg.subtle.active' },
      },
      unstyled: {},
    },
    size: {
      xs: { ...sizeStyles, circle: { '--size': '24px', '--thickness': '4px' } },
      sm: { ...sizeStyles, circle: { '--size': '32px', '--thickness': '5px' } },
      md: { ...sizeStyles, circle: { '--size': '40px', '--thickness': '6px' } },
      lg: { ...sizeStyles, circle: { '--size': '48px', '--thickness': '7px' } },
      xl: { ...sizeStyles, circle: { '--size': '64px', '--thickness': '8px' } },
      unstyled: {},
    },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
})
