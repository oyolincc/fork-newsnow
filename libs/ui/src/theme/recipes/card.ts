import { defineSlotRecipe } from '@pandacss/dev'

const appearance = {
  root: { borderRadius: 'md' },
  title: { fontWeight: 'semibold' },
  description: { color: 'gray.fg.muted' },
} as const

export const card = defineSlotRecipe({
  className: 'card',
  jsx: ['Card.Root'],
  slots: ['root', 'header', 'body', 'footer', 'title', 'description'],
  base: {
    root: { display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' },
    header: { display: 'flex', flexDirection: 'column', gap: '1', p: '6' },
    body: { display: 'flex', flex: '1', flexDirection: 'column', pb: '6', px: '6' },
    footer: { display: 'flex', justifyContent: 'flex-end', gap: '3', pb: '6', pt: '2', px: '6' },
    title: { textStyle: 'lg' },
    description: { textStyle: 'sm' },
  },
  defaultVariants: { variant: 'outline' },
  variants: {
    variant: {
      elevated: {
        ...appearance,
        root: { ...appearance.root, bg: 'gray.bg.surface', boxShadow: 'lg' },
      },
      outline: {
        ...appearance,
        root: { ...appearance.root, bg: 'gray.bg.surface', borderWidth: '1px' },
      },
      subtle: { ...appearance, root: { ...appearance.root, bg: 'gray.bg.subtle' } },
      unstyled: {},
    },
  },
})
