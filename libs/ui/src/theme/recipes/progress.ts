import { progressAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const stripeBackground = `linear-gradient(45deg, var(--stripe-color) 25%, transparent 25%, transparent 50%, var(--stripe-color) 50%, var(--stripe-color) 75%, transparent 75%, transparent)`

const sizeStyles = {
  root: { textStyle: 'sm' },
  label: { gap: '1' },
  valueText: { textStyle: 'xs', lineHeight: '1' },
} as const

const appearance = {
  range: {
    '--track-color': 'colors.colorPalette.bg.default',
    bgColor: 'var(--track-color)',
    _indeterminate: {
      backgroundImage: `linear-gradient(to right, transparent 0%, var(--track-color) 50%, transparent 100%)`,
    },
  },
  label: { fontWeight: 'medium' },
  valueText: { fontWeight: 'medium' },
} as const

export const progress = defineSlotRecipe({
  slots: progressAnatomy.keys(),
  className: 'app-progress',
  jsx: ['Progress.Root', 'Progress.RootProvider'],
  base: {
    root: { position: 'relative' },
    track: { overflow: 'hidden', position: 'relative' },
    range: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transitionProperty: 'width, height',
      transitionDuration: 'slow',
      height: '100%',
      _indeterminate: {
        '--animate-from-x': '-40%',
        '--animate-to-x': '100%',
        position: 'absolute',
        willChange: 'inset-inline-start',
        minWidth: '50%',
        animation: 'position 1s ease infinite normal none running',
      },
    },
    label: { display: 'inline-flex', alignItems: 'center' },
  },
  variants: {
    variant: {
      solid: {
        ...appearance,
        track: { bgColor: 'gray.bg.subtle' },
        range: {
          ...appearance.range,
          bgColor: 'var(--track-color)',
          color: 'colorPalette.fg.onSolid',
        },
      },
      subtle: {
        ...appearance,
        track: { bgColor: 'colorPalette.bg.subtle.active' },
        range: {
          ...appearance.range,
          bgColor: 'var(--track-color)',
          color: 'colorPalette.fg.onSolid',
        },
      },
      unstyled: {},
    },
    shape: {
      square: {},
      rounded: { track: { borderRadius: 'xs' } },
      full: { track: { borderRadius: 'full' } },
      unstyled: {},
    },
    striped: {
      true: {
        range: {
          backgroundImage: stripeBackground,
          backgroundSize: `var(--stripe-size) var(--stripe-size)`,
          '--stripe-size': '1rem',
          '--stripe-color': { _light: 'rgba(255, 255, 255, 0.3)', _dark: 'rgba(0, 0, 0, 0.3)' },
        },
      },
    },
    animated: {
      true: {
        range: {
          '--animate-from': 'var(--stripe-size)',
          animation: 'bg-position 1s linear infinite',
        },
      },
    },
    size: {
      xs: { ...sizeStyles, track: { h: '1.5' } },
      sm: { ...sizeStyles, track: { h: '2' } },
      md: { ...sizeStyles, track: { h: '2.5' } },
      lg: { ...sizeStyles, track: { h: '3' } },
      xl: { ...sizeStyles, track: { h: '3.5' } },
      unstyled: {},
    },
  },
  compoundVariants: [
    {
      variant: ['solid', 'subtle'],
      striped: true,
      css: { range: { _indeterminate: { backgroundImage: stripeBackground } } },
    },
  ],
  defaultVariants: { variant: 'solid', size: 'md', shape: 'rounded' },
})
