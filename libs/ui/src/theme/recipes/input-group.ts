import { defineSlotRecipe } from '@pandacss/dev'

const inputPadding = {
  '& > input:not(:first-child)': {
    ps: 'calc(var(--input-group-padding) - var(--input-group-start-offset, 0px))',
  },
  '& > input:not(:last-child)': {
    pe: 'calc(var(--input-group-padding) - var(--input-group-end-offset, 0px))',
  },
} as const

export const inputGroup = defineSlotRecipe({
  className: 'app-input-group',
  jsx: ['InputGroup'],
  slots: ['root', 'element'],
  base: {
    root: {
      position: 'relative',
      width: 'full',
    },
    element: {
      alignItems: 'center',
      color: 'gray.fg.muted',
      display: 'flex',
      height: 'full',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: '2',
      _icon: {
        color: 'gray.fg.subtle',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      unstyled: {},
      xs: {
        element: { minW: '8', _icon: { boxSize: '4' } },
        root: {
          ...inputPadding,
          '--input-group-padding': '{spacing.7}',
        },
      },
      sm: {
        root: {
          ...inputPadding,
          '--input-group-padding': '{spacing.8}',
        },
        element: { minW: '9', _icon: { boxSize: '4.5' } },
      },
      md: {
        root: {
          ...inputPadding,
          '--input-group-padding': '{spacing.9}',
        },
        element: { minW: '10', _icon: { boxSize: '5' } },
      },
      lg: {
        root: {
          ...inputPadding,
          '--input-group-padding': '{spacing.10}',
        },
        element: { minW: '11', _icon: { boxSize: '5' } },
      },
      xl: {
        root: {
          ...inputPadding,
          '--input-group-padding': '{spacing.11}',
        },
        element: { minW: '11', _icon: { boxSize: '5.5' } },
      },
    },
  },
})
