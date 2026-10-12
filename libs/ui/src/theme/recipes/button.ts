import { defineRecipe } from '@pandacss/dev'

const appearance = {
  borderRadius: 'sm',
  cursor: 'pointer',
  fontWeight: 'semibold',
  outline: '0',
  transition: 'colors',
  transitionProperty: 'background-color, border-color, color, box-shadow',
  _disabled: { layerStyle: 'disabled' },
  focusVisibleRing: 'outside',
} as const

const sizeStyles = {
  gap: '2',
} as const

export const button = defineRecipe({
  className: 'button',
  jsx: ['Button', 'IconButton', 'CloseButton', 'ButtonGroup'],
  base: {
    alignItems: 'center',
    appearance: 'none',
    display: 'inline-flex',
    flexShrink: '0',
    isolation: 'isolate',
    justifyContent: 'center',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    _icon: {
      flexShrink: '0',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
  variants: {
    variant: {
      unstyled: {},
      solid: {
        ...appearance,
        bg: 'colorPalette.bg.default',
        color: 'colorPalette.fg.onSolid',
        _hover: {
          bg: 'colorPalette.bg.default.hover',
        },
      },
      surface: {
        ...appearance,
        bg: 'colorPalette.bg.surface',
        borderWidth: '1px',
        borderColor: 'colorPalette.border.default',
        color: 'colorPalette.fg.default',
        _hover: {
          borderColor: 'colorPalette.border.default.hover',
        },
        _active: {
          bg: 'colorPalette.bg.surface.active',
        },
        _on: {
          bg: 'colorPalette.bg.surface.active',
        },
      },
      subtle: {
        ...appearance,
        bg: 'colorPalette.bg.subtle',
        color: 'colorPalette.fg.default',
        _hover: {
          bg: 'colorPalette.bg.subtle.hover',
        },
        _active: {
          bg: 'colorPalette.bg.subtle.active',
        },
        _on: {
          bg: 'colorPalette.bg.subtle.active',
        },
      },
      outline: {
        ...appearance,
        borderWidth: '1px',
        borderColor: 'colorPalette.border.strong',
        color: 'colorPalette.fg.default',
        _hover: {
          bg: 'colorPalette.a2',
        },
        _active: {
          bg: 'colorPalette.a3',
        },
        _on: {
          bg: 'colorPalette.a3',
        },
      },
      plain: {
        ...appearance,
        color: 'colorPalette.fg.default',
        _hover: {
          bg: 'colorPalette.bg.subtle',
        },
        _active: {
          bg: 'colorPalette.bg.subtle.hover',
        },
        _on: {
          bg: 'colorPalette.bg.subtle.hover',
        },
      },
    },
    size: {
      unstyled: {},
      '2xs': {
        ...sizeStyles,
        h: '6',
        minW: '6',
        textStyle: 'xs',
        px: '2',
        _icon: { boxSize: '3.5' },
      },
      xs: { ...sizeStyles, h: '8', minW: '8', textStyle: 'sm', px: '2.5', _icon: { boxSize: '4' } },
      sm: { ...sizeStyles, h: '9', minW: '9', textStyle: 'sm', px: '3', _icon: { boxSize: '4' } },
      md: {
        ...sizeStyles,
        h: '10',
        minW: '10',
        textStyle: 'sm',
        px: '3.5',
        _icon: { boxSize: '5' },
      },
      lg: { ...sizeStyles, h: '11', minW: '11', textStyle: 'md', px: '4', _icon: { boxSize: '5' } },
      xl: {
        ...sizeStyles,
        h: '12',
        minW: '12',
        textStyle: 'md',
        px: '4.5',
        _icon: { boxSize: '5.5' },
      },
      '2xl': {
        ...sizeStyles,
        h: '16',
        minW: '16',
        textStyle: 'xl',
        px: '6',
        _icon: { boxSize: '6' },
      },
    },
  },
})
