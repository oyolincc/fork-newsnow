import { defineRecipe } from '@pandacss/dev'

const appearance = {
  borderRadius: 'sm',
  outline: '0',
  transition: 'colors',
  transitionProperty: 'box-shadow, border-color',
  _disabled: { layerStyle: 'disabled' },
} as const

export const textarea = defineRecipe({
  className: 'app-textarea',
  jsx: ['Textarea'],
  base: {
    appearance: 'none',
    minWidth: '0',
    position: 'relative',
    width: '100%',
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
  variants: {
    variant: {
      unstyled: {},
      outline: {
        ...appearance,
        borderWidth: '1px',
        borderColor: 'gray.border.strong',
        focusVisibleRing: 'inside',
        _invalid: {
          borderColor: 'red.9',
          focusRingColor: 'red.9',
        },
      },
      surface: {
        ...appearance,
        bg: 'gray.bg.surface',
        borderWidth: '1px',
        borderColor: 'gray.border.default',
        focusVisibleRing: 'inside',
        _invalid: {
          borderColor: 'red.9',
          focusRingColor: 'red.9',
        },
      },
      subtle: {
        ...appearance,
        borderWidth: '1px',
        borderColor: 'transparent',
        bg: 'gray.bg.subtle',
        color: 'gray.fg.default',
        focusVisibleRing: 'inside',
        _invalid: {
          borderColor: 'red.9',
          focusRingColor: 'red.9',
        },
      },
      flushed: {
        ...appearance,
        borderBottomWidth: '1px',
        borderBottomColor: 'gray.border.strong',
        borderRadius: '0',
        color: 'gray.fg.default',
        px: '0',
        _invalid: {
          borderColor: 'red.9',
        },
        _focus: {
          borderColor: 'colorPalette.bg.default',
          boxShadowColor: 'colorPalette.bg.default',
          boxShadow: '0 1px 0 0 var(--shadow-color)',
          _invalid: {
            borderColor: 'red.9',
            boxShadowColor: 'red.9',
          },
        },
      },
    },
    size: {
      unstyled: {},
      xs: { textStyle: 'sm', px: '2', py: '5px', scrollPaddingBottom: '5px' },
      sm: { textStyle: 'sm', px: '2.5', py: '7px', scrollPaddingBottom: '7px' },
      md: { textStyle: 'md', px: '3', py: '7px', scrollPaddingBottom: '7px' },
      lg: { textStyle: 'md', px: '3.5', py: '9px', scrollPaddingBottom: '9px' },
      xl: { textStyle: 'lg', px: '4', py: '9px', scrollPaddingBottom: '9px' },
    },
  },
})
