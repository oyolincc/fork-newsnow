import { switchAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  root: {
    '--switch-diff': 'calc(var(--switch-width) - var(--switch-height))',
    '--switch-x': {
      base: 'var(--switch-diff)',
      _rtl: 'calc(var(--switch-diff) * -1)',
    },
  },
  indicator: {
    height: 'var(--switch-height)',
    width: 'var(--switch-height)',
    fontSize: 'var(--switch-indicator-font-size)',
    insetInlineStart: 'calc(var(--switch-x) - 2px)',
    _checked: { insetInlineStart: '2px' },
  },
  control: {
    gap: '0.5rem',
    width: 'var(--switch-width)',
    height: 'var(--switch-height)',
  },
  thumb: {
    width: 'var(--switch-height)',
    height: 'var(--switch-height)',
    scale: '0.8',
    _checked: { translate: 'var(--switch-x) 0' },
  },
} as const

export const switchRecipe = defineSlotRecipe({
  className: 'switch',
  jsx: ['Switch.Root', 'Switch.RootProvider'],
  slots: switchAnatomy.extendWith('indicator').keys(),
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
    },
    label: {
      fontWeight: 'medium',
      userSelect: 'none',
    },
    indicator: {
      position: 'absolute',
      fontWeight: 'medium',
      flexShrink: 0,
      userSelect: 'none',
      display: 'grid',
      placeContent: 'center',
      transition: 'inset-inline-start 0.12s ease',
    },
    control: {
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'flex-start',
      cursor: 'pointer',
      borderRadius: 'full',
      position: 'relative',
      transition: 'background',
      focusVisibleRing: 'outside',
      _disabled: { layerStyle: 'disabled' },
      _invalid: { outline: '2px solid', outlineColor: 'red.9', outlineOffset: '2px' },
    },
    thumb: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transitionProperty: 'translate',
      transitionDuration: 'fast',
      borderRadius: 'inherit',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
  variants: {
    variant: {
      solid: {
        control: {
          borderRadius: 'full',
          bg: 'gray.bg.subtle',
          focusVisibleRing: 'outside',
          _checked: {
            bg: 'colorPalette.bg.default',
          },
        },
        thumb: {
          bg: 'white',
          _checked: {
            bg: 'colorPalette.fg.onSolid',
          },
          boxShadow: 'xs',
        },
      },
    },
    size: {
      unstyled: {},
      xs: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          gap: '2',
          '--switch-width': 'sizes.8',
          '--switch-height': 'sizes.4',
          '--switch-indicator-font-size': 'fontSizes.xs',
        },
        label: { fontSize: 'sm', lineHeight: '1' },
      },
      sm: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          gap: '2',
          '--switch-width': 'sizes.9',
          '--switch-height': 'sizes.4.5',
          '--switch-indicator-font-size': 'fontSizes.xs',
        },
        label: { fontSize: 'sm', lineHeight: '1' },
      },
      md: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          gap: '3',
          '--switch-width': 'sizes.10',
          '--switch-height': 'sizes.5',
          '--switch-indicator-font-size': 'fontSizes.sm',
        },
        label: { fontSize: 'md', lineHeight: '1' },
      },
      lg: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          gap: '3',
          '--switch-width': 'sizes.11',
          '--switch-height': 'sizes.5.5',
          '--switch-indicator-font-size': 'fontSizes.md',
        },
        label: { fontSize: 'lg', lineHeight: '1' },
      },
    },
  },
})
