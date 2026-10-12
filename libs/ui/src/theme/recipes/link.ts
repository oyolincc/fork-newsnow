import { defineRecipe } from '@pandacss/dev'

const appearance = {
  borderRadius: 'xs',
  cursor: 'pointer',
  focusVisibleRing: 'outside',
  fontWeight: 'medium',
  outline: 'none',
  textDecorationLine: 'underline',
  textDecorationThickness: '0.1em',
  textUnderlineOffset: '0.125em',
  transitionDuration: 'normal',
  transitionProperty: 'text-decoration-color',
} as const

export const link = defineRecipe({
  className: 'link',
  jsx: ['Link'],
  base: { alignItems: 'center', display: 'inline-flex', gap: '1.5', _icon: { boxSize: '1em' } },
  defaultVariants: { variant: 'underline' },
  variants: {
    variant: {
      underline: {
        ...appearance,
        textDecorationColor: 'colorPalette.fg.default/60',
        _hover: { textDecorationColor: 'colorPalette.fg.default' },
      },
      plain: {
        ...appearance,
        textDecorationColor: 'transparent',
        _hover: { textDecorationColor: 'colorPalette.fg.default' },
      },
      unstyled: {},
    },
  },
})
