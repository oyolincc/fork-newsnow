import { editableAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = { root: { gap: '1.5' }, control: { gap: '1.5' } } as const

export const editable = defineSlotRecipe({
  slots: editableAnatomy.keys(),
  className: 'editable',
  jsx: ['Editable.Root', 'Editable.RootProvider'],
  base: {
    root: { alignItems: 'center', display: 'inline-flex', position: 'relative', width: 'full' },
    preview: {
      alignItems: 'center',
      borderRadius: 'sm',
      cursor: 'default',
      display: 'inline-flex',
      transitionDuration: 'normal',
      transitionProperty: 'common',
      _disabled: { userSelect: 'none' },
      _hover: { bg: 'gray.bg.subtle' },
    },
    input: {
      borderRadius: 'sm',
      focusRingWidth: '2px',
      focusRing: 'inside',
      transitionDuration: 'normal',
      transitionProperty: 'common',
      width: 'full',
      _focusVisible: { outlineOffset: '-1px' },
    },
    control: { alignItems: 'center', display: 'inline-flex' },
  },
  defaultVariants: { size: 'md' },
  variants: {
    size: {
      '2xs': {
        ...sizeStyles,
        preview: { textStyle: 'xs', px: '2', py: '0.5' },
        input: { textStyle: 'xs', px: '2', py: '0.5' },
      },
      xs: {
        ...sizeStyles,
        preview: { textStyle: 'sm', px: '2.5', py: '1.5' },
        input: { textStyle: 'sm', px: '2.5', py: '1.5' },
      },
      sm: {
        ...sizeStyles,
        preview: { textStyle: 'sm', px: '3', py: '2' },
        input: { textStyle: 'sm', px: '3', py: '2' },
      },
      md: {
        ...sizeStyles,
        preview: { textStyle: 'sm', px: '3.5', py: '2.5' },
        input: { textStyle: 'sm', px: '3.5', py: '2.5' },
      },
      lg: {
        ...sizeStyles,
        preview: { textStyle: 'md', px: '4', py: '2.5' },
        input: { textStyle: 'md', px: '4', py: '2.5' },
      },
      unstyled: {},
    },
  },
})
