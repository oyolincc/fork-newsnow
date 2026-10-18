import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = { content: { gap: '1' } } as const

const appearance = { root: { borderRadius: 'md' }, title: { fontWeight: 'semibold' } } as const

export const alert = defineSlotRecipe({
  className: 'app-alert',
  jsx: ['Alert.Root'],
  slots: ['root', 'content', 'description', 'indicator', 'title'],
  base: {
    root: { alignItems: 'flex-start', display: 'flex', position: 'relative', width: 'full' },
    content: { display: 'flex', flex: '1', flexDirection: 'column' },
    description: { display: 'inline' },
    indicator: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
    },
  },
  defaultVariants: { size: 'md', status: 'info', variant: 'subtle' },
  variants: {
    size: {
      md: {
        ...sizeStyles,
        root: { gap: '3', p: '4', textStyle: 'sm' },
        indicator: { _icon: { width: '5', height: '5' } },
      },
      lg: {
        ...sizeStyles,
        root: { gap: '4', p: '4', textStyle: 'md' },
        indicator: { _icon: { width: '6', height: '6' } },
      },
      unstyled: {},
    },
    variant: {
      solid: {
        ...appearance,
        root: {
          ...appearance.root,
          bg: 'colorPalette.bg.default',
          color: 'colorPalette.fg.onSolid',
        },
      },
      surface: {
        ...appearance,
        root: {
          ...appearance.root,
          bg: 'colorPalette.bg.surface',
          borderWidth: '1px',
          borderColor: 'colorPalette.border.default',
          color: 'colorPalette.fg.default',
        },
      },
      subtle: {
        ...appearance,
        root: {
          ...appearance.root,
          bg: 'colorPalette.bg.subtle',
          color: 'colorPalette.fg.default',
        },
      },
      outline: {
        ...appearance,
        root: {
          ...appearance.root,
          borderWidth: '1px',
          borderColor: 'colorPalette.border.strong',
          color: 'colorPalette.fg.default',
        },
      },
      unstyled: {},
    },
    status: {
      info: { root: { colorPalette: 'gray' } },
      warning: { root: { colorPalette: 'amber' } },
      success: { root: { colorPalette: 'green' } },
      error: { root: { colorPalette: 'red' } },
      neutral: {},
    },
  },
})
