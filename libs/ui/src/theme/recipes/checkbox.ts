import { checkboxAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const controlAppearance = {
  borderWidth: '1px',
  borderColor: 'transparent',
  borderRadius: 'xs',
  cursor: 'pointer',
  focusVisibleRing: 'outside',
} as const

export const checkbox = defineSlotRecipe({
  slots: checkboxAnatomy.keys(),
  className: 'app-checkbox',
  jsx: ['Checkbox.Root', 'Checkbox.RootProvider', 'Checkbox.Group', 'CheckboxGroup'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'top',
      position: 'relative',
    },
    control: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
    },
    label: {
      userSelect: 'none',
    },
  },

  variants: {
    size: {
      unstyled: {},
      sm: {
        root: { gap: '2' },
        label: { textStyle: 'sm' },
        control: { boxSize: '4.5', _icon: { boxSize: '3' } },
      },
      md: {
        root: { gap: '3' },
        label: { textStyle: 'md' },
        control: { boxSize: '5', _icon: { boxSize: '3.5' } },
      },
      lg: {
        root: { gap: '3' },
        label: { textStyle: 'lg' },
        control: { boxSize: '5.5', _icon: { boxSize: '4' } },
      },
    },

    variant: {
      unstyled: {},
      solid: {
        root: { _disabled: { layerStyle: 'disabled' } },
        label: { fontWeight: 'medium' },
        control: {
          ...controlAppearance,
          borderColor: 'gray.border.subtle',
          _checked: {
            bg: 'colorPalette.bg.default',
            borderColor: 'colorPalette.bg.default',
            color: 'colorPalette.fg.onSolid',
          },
          _invalid: {
            background: 'red.9',
          },
        },
      },
      surface: {
        root: { _disabled: { layerStyle: 'disabled' } },
        label: { fontWeight: 'medium' },
        control: {
          ...controlAppearance,
          bg: 'colorPalette.bg.surface',
          borderWidth: '1px',
          borderColor: 'colorPalette.border.default',
          color: 'colorPalette.fg.default',
        },
      },
      subtle: {
        root: { _disabled: { layerStyle: 'disabled' } },
        label: { fontWeight: 'medium' },
        control: {
          ...controlAppearance,
          bg: 'colorPalette.bg.subtle',
          color: 'colorPalette.fg.default',
        },
      },
      outline: {
        root: { _disabled: { layerStyle: 'disabled' } },
        label: { fontWeight: 'medium' },
        control: {
          ...controlAppearance,
          borderWidth: '1px',
          borderColor: 'colorPalette.border.strong',
          color: 'colorPalette.fg.default',
          _checked: {
            borderColor: 'colorPalette.bg.default',
          },
        },
      },
      plain: {
        root: { _disabled: { layerStyle: 'disabled' } },
        label: { fontWeight: 'medium' },
        control: {
          ...controlAppearance,
          color: 'colorPalette.fg.default',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})
