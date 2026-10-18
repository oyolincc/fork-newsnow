import { defineRecipe } from '@pandacss/dev'

export const separator = defineRecipe({
  className: 'app-separator',
  jsx: ['Separator'],
  base: { display: 'block', borderColor: 'gray.border.subtle' },
  variants: {
    variant: {
      solid: { borderStyle: 'solid' },
      dashed: { borderStyle: 'dashed' },
      dotted: { borderStyle: 'dotted' },
    },
    orientation: {
      horizontal: { borderTopWidth: 'var(--separator-thickness)' },
      vertical: { borderInlineStartWidth: 'var(--separator-thickness)' },
    },
    size: {
      xs: { '--separator-thickness': '0.5px' },
      sm: { '--separator-thickness': '1px' },
      md: { '--separator-thickness': '2px' },
      lg: { '--separator-thickness': '3px' },
    },
  },
  defaultVariants: { variant: 'solid', orientation: 'horizontal', size: 'sm' },
})
