import { defineRecipe } from '@pandacss/dev'

const sizeStyles = { lineHeight: '1' } as const

const appearance = { borderRadius: 'sm', fontWeight: 'medium' } as const

export const badge = defineRecipe({
  className: 'app-badge',
  jsx: ['Badge'],
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  defaultVariants: { variant: 'subtle', size: 'md' },
  variants: {
    variant: {
      solid: { ...appearance, bg: 'colorPalette.bg.default', color: 'colorPalette.fg.onSolid' },
      surface: {
        ...appearance,
        bg: 'colorPalette.bg.surface',
        borderWidth: '1px',
        borderColor: 'colorPalette.border.default',
        color: 'colorPalette.fg.default',
      },
      subtle: { ...appearance, bg: 'colorPalette.bg.subtle', color: 'colorPalette.fg.default' },
      outline: {
        ...appearance,
        borderWidth: '1px',
        borderColor: 'colorPalette.border.strong',
        color: 'colorPalette.fg.default',
      },
      unstyled: {},
    },
    size: {
      sm: {
        ...sizeStyles,
        fontSize: 'xs',
        px: '1.5',
        h: '4.5',
        gap: '0.5',
        _icon: { boxSize: '2.5' },
      },
      md: { ...sizeStyles, fontSize: 'xs', px: '2', h: '5', gap: '1', _icon: { boxSize: '3' } },
      lg: {
        ...sizeStyles,
        fontSize: 'xs',
        px: '2.5',
        h: '5.5',
        gap: '1',
        _icon: { boxSize: '3.5' },
      },
      xl: { ...sizeStyles, fontSize: 'sm', px: '2.5', h: '6', gap: '1.5', _icon: { boxSize: '4' } },
      '2xl': {
        ...sizeStyles,
        fontSize: 'md',
        px: '3',
        h: '7',
        gap: '1.5',
        _icon: { boxSize: '4.5' },
      },
      unstyled: {},
    },
  },
})
