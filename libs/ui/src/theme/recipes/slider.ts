import { sliderAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  root: {
    gap: '1',
    textStyle: 'sm',
    '--slider-thumb-size': 'sizes.5',
    '--slider-track-size': 'sizes.2',
    '--slider-marker-center': '8px',
    '--slider-marker-size': 'sizes.1',
    '--slider-marker-inset': '4px',
  },
  label: { textStyle: 'sm' },
  marker: { gap: 'calc(var(--slider-thumb-size) / 2)', textStyle: 'xs' },
  markerIndicator: { width: 'var(--slider-marker-size)', height: 'var(--slider-marker-size)' },
  thumb: { width: 'var(--slider-thumb-size)', height: 'var(--slider-thumb-size)' },
} as const

export const slider = defineSlotRecipe({
  className: 'slider',
  jsx: ['Slider.Root', 'Slider.RootProvider'],
  slots: sliderAnatomy.extendWith('markerIndicator').keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      isolation: 'isolate',
      touchAction: 'none',
      width: 'full',
    },
    label: { fontWeight: 'medium' },
    control: {
      display: 'inline-flex',
      alignItems: 'center',
    },
    track: {
      overflow: 'hidden',
      borderRadius: 'full',
      flex: '1',
    },
    range: {
      width: 'inherit',
      height: 'inherit',
    },
    markerGroup: {
      position: 'absolute!',
      zIndex: '1',
    },
    marker: {
      display: 'flex',
      alignItems: 'center',
      color: 'gray.fg.muted',
    },
    markerIndicator: { borderRadius: 'full', bg: 'colorPalette.fg.onSolid' },
    thumb: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 0,
      zIndex: '2',
      borderRadius: 'full',
      _focusVisible: {
        ring: '2px',
        ringColor: 'colorPalette.ring',
        ringOffset: '2px',
        ringOffsetColor: 'gray.bg.page',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    orientation: 'horizontal',
  },
  variants: {
    size: {
      unstyled: {},
      sm: sizeStyles,
      md: sizeStyles,
      lg: sizeStyles,
    },
    variant: {
      outline: {
        thumb: {
          bg: 'gray.bg.surface',
          borderWidth: '2px',
          borderColor: 'colorPalette.bg.default',
          boxShadow: 'xs',
        },
        range: {
          bg: 'colorPalette.bg.default',
        },
        track: {
          bg: 'gray.border.subtle',
        },
      },
    },
    orientation: {
      vertical: {
        root: {
          display: 'inline-flex',
        },
        control: {
          flexDirection: 'column',
          height: '100%',
        },
        thumb: {
          left: '50%',
          translate: '-50% 0',
        },
        marker: {
          flexDirection: 'row',
        },
      },
      horizontal: {
        control: {
          flexDirection: 'row',
          width: '100%',
        },
        thumb: {
          top: '50%',
          translate: '0 -50%',
        },
        marker: {
          flexDirection: 'column',
        },
      },
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md', 'lg'],
      orientation: 'vertical',
      css: {
        control: {
          minWidth: 'var(--slider-thumb-size)',
          '&[data-has-mark-label]': { marginEnd: '4' },
        },
        track: { width: 'var(--slider-track-size)' },
        markerGroup: {
          insetStart: 'var(--slider-marker-center)',
          insetBlock: 'var(--slider-marker-inset)',
        },
      },
    },
    {
      size: ['sm', 'md', 'lg'],
      orientation: 'horizontal',
      css: {
        control: {
          minHeight: 'var(--slider-thumb-size)',
          '&[data-has-mark-label]': { marginBottom: '4' },
        },
        track: { height: 'var(--slider-track-size)' },
        markerGroup: {
          top: 'var(--slider-marker-center)',
          insetInline: 'var(--slider-marker-inset)',
        },
      },
    },
  ],
})
