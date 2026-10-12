import { defineRecipe } from '@pandacss/dev'

const appearance = {
  borderRadius: 'sm',
  color: 'gray.fg.muted',
} as const

export const inputAddon = defineRecipe({
  className: 'input-addon',
  jsx: ['InputAddon'],
  base: {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    width: 'auto',
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
      },
      surface: {
        ...appearance,
        bg: 'gray.bg.surface',
        borderWidth: '1px',
        borderColor: 'gray.border.default',
      },
      subtle: {
        ...appearance,
        bg: 'gray.bg.subtle',
      },
    },
    size: {
      unstyled: {},
      xs: { textStyle: 'sm', px: '2', _icon: { boxSize: '4' } },
      sm: { textStyle: 'sm', px: '2.5', _icon: { boxSize: '4.5' } },
      md: { textStyle: 'md', px: '3', _icon: { boxSize: '5' } },
      lg: { textStyle: 'md', px: '3.5', _icon: { boxSize: '5' } },
      xl: { textStyle: 'lg', px: '4', _icon: { boxSize: '5.5' } },
    },
  },
})
