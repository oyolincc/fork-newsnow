import { radioGroupAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const radioGroup = defineSlotRecipe({
  className: 'app-radio-group',
  jsx: ['RadioGroup.Root', 'RadioGroup.RootProvider'],
  slots: radioGroupAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    itemControl: {
      '&[data-custom]': { _after: { display: 'none' } },
      alignItems: 'center',
      borderRadius: 'full',
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'center',
      verticalAlign: 'top',
      _after: { content: '""', display: 'block', borderRadius: 'full' },
      _focusVisible: { focusVisibleRing: 'outside' },
    },
    item: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      _disabled: { layerStyle: 'disabled' },
    },
    itemText: {
      fontWeight: 'medium',
      userSelect: 'none',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
  variants: {
    variant: {
      solid: {
        itemControl: {
          boxShadow: 'inset 0 0 0 1px var(--shadow-color)',
          boxShadowColor: 'gray.border.default',
          _checked: {
            bg: 'colorPalette.bg.default',
            color: 'colorPalette.fg.onSolid',
            boxShadowColor: 'colorPalette.bg.default',
            _after: {
              background: 'colorPalette.fg.onSolid',
            },
          },
        },
      },
    },
    size: {
      unstyled: {},
      sm: {
        root: { gap: '3' },
        item: { gap: '2' },
        itemControl: { boxSize: '4.5', _after: { boxSize: '40%' } },
        itemText: { textStyle: 'sm' },
      },
      md: {
        root: { gap: '3' },
        item: { gap: '3' },
        itemControl: { boxSize: '5', _after: { boxSize: '40%' } },
        itemText: { textStyle: 'md' },
      },
      lg: {
        root: { gap: '3' },
        item: { gap: '3' },
        itemControl: { boxSize: '5.5', _after: { boxSize: '40%' } },
        itemText: { textStyle: 'lg' },
      },
    },
  },
})
