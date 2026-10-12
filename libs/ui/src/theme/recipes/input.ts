import type { defineRecipe } from '@pandacss/dev'

const appearance = {
  borderRadius: 'sm',
  outline: '0',
  transition: 'colors',
  _disabled: { layerStyle: 'disabled' },
} as const

const sizeStyles = {
  height: 'var(--input-height)',
  minHeight: 'var(--input-height)',
  minW: 'var(--input-height)',
} as const

export const input = {
  className: 'input',
  jsx: ['Input', 'Field.Input', 'PasswordInput'],
  base: {
    appearance: 'none',
    position: 'relative',
    textAlign: 'start',
    width: '100%',
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
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
          focusRingColor: 'red.9',
          borderColor: 'red.9',
        },
      },
      surface: {
        ...appearance,
        bg: 'gray.bg.surface',
        borderWidth: '1px',
        borderColor: 'gray.border.default',
        focusVisibleRing: 'inside',

        _invalid: {
          focusRingColor: 'red.9',
          borderColor: 'red.9',
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
          focusRingColor: 'red.9',
          borderColor: 'red.9',
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
      '2xs': { ...sizeStyles, textStyle: 'xs', px: '1.5', '--input-height': 'sizes.7' },
      xs: { ...sizeStyles, textStyle: 'sm', px: '2', '--input-height': 'sizes.8' },
      sm: { ...sizeStyles, textStyle: 'sm', px: '2.5', '--input-height': 'sizes.9' },
      md: { ...sizeStyles, textStyle: 'md', px: '3', '--input-height': 'sizes.10' },
      lg: { ...sizeStyles, textStyle: 'md', px: '3.5', '--input-height': 'sizes.11' },
      xl: { ...sizeStyles, textStyle: 'lg', px: '4', '--input-height': 'sizes.12' },
      '2xl': { ...sizeStyles, textStyle: '3xl', px: '4.5', '--input-height': 'sizes.16' },
    },
  },
} satisfies Parameters<typeof defineRecipe>[0]
