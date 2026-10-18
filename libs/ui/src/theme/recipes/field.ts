import { fieldAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const field = defineSlotRecipe({
  className: 'app-field',
  jsx: ['Field.Root', 'Field.RootProvider'],
  slots: fieldAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      alignItems: 'center',
      color: 'gray.fg.default',
      display: 'flex',
      gap: '0.5',
      textAlign: 'start',
      userSelect: 'none',
      textStyle: 'label',
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    requiredIndicator: {
      color: 'colorPalette.bg.default',
    },
    helperText: {
      color: 'gray.fg.muted',
      textStyle: 'sm',
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    errorText: {
      color: 'red.9',
      textStyle: 'sm',
    },
  },
})
