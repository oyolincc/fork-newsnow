import { radioGroupAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const appearance = {
  item: {
    borderRadius: 'sm',
    cursor: 'pointer',
    _focusVisible: { focusVisibleRing: 'outside' },
    _disabled: { layerStyle: 'disabled' },
  },
  itemControl: { borderRadius: 'inherit' },
  itemDescription: { opacity: '0.64' },
  itemAddon: { borderBottomRadius: 'inherit', borderColor: 'inherit', borderTopWidth: '1px' },
  itemIndicator: {
    borderRadius: 'full',
    _after: { content: '""', borderRadius: 'full' },
  },
} as const

const sizeStyles = {
  root: { gap: '1.5' },
  label: { textStyle: 'label' },
  itemContent: { gap: '1' },
  itemDescription: { textStyle: 'sm' },
} as const

export const radioCard = defineSlotRecipe({
  className: 'radio-card',
  jsx: ['RadioCard.Root', 'RadioCard.RootProvider'],
  slots: radioGroupAnatomy
    .extendWith('itemContent', 'itemDescription', 'itemAddon', 'itemIndicator')
    .keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
    },
    item: {
      flexDirection: 'column',
      display: 'flex',
      userSelect: 'none',
      width: 'full',
      position: 'relative',
    },
    itemControl: {
      display: 'flex',
      width: 'full',
      justifyContent: 'var(--radio-card-justify)',
      alignItems: 'var(--radio-card-align)',
    },
    itemContent: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      minWidth: '0',
      justifyContent: 'var(--radio-card-justify)',
      alignItems: 'var(--radio-card-align)',
    },
    itemIndicator: {
      _after: { display: 'block' },
      '&[data-custom]': { _after: { display: 'none' } },
      alignItems: 'center',
      display: 'inline-flex',
      flexShrink: '0',
      justifyContent: 'center',
      verticalAlign: 'top',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    align: 'start',
    justify: 'start',
    orientation: 'horizontal',
  },
  variants: {
    variant: {
      unstyled: {},
      subtle: {
        ...appearance,
        item: {
          ...appearance.item,
          background: 'gray.bg.subtle',
          color: 'gray.fg.default',
          _checked: {
            background: 'colorPalette.bg.subtle',
            color: 'colorPalette.fg.default',
          },
        },
        itemIndicator: {
          ...appearance.itemIndicator,
          borderWidth: '1px',
          borderColor: 'gray.border.default',
          _checked: {
            borderColor: 'colorPalette.bg.default',
            color: 'colorPalette.bg.default',
            _after: {
              bg: 'colorPalette.bg.default',
            },
          },
        },
      },
      outline: {
        ...appearance,
        item: {
          ...appearance.item,
          borderWidth: '1px',
          borderColor: 'gray.border.strong',
          _checked: {
            boxShadow: '0 0 0 1px var(--shadow-color)',
            boxShadowColor: 'colorPalette.bg.default',
            borderColor: 'colorPalette.bg.default',
          },
        },
        itemIndicator: {
          ...appearance.itemIndicator,
          borderWidth: '1px',
          borderColor: 'gray.border.strong',
          _checked: {
            bg: 'colorPalette.bg.default',
            color: 'colorPalette.fg.onSolid',
            borderColor: 'colorPalette.bg.default',
            _after: {
              background: 'colorPalette.fg.onSolid',
            },
          },
        },
      },
      surface: {
        ...appearance,
        item: {
          ...appearance.item,
          borderWidth: '1px',
          background: 'gray.bg.surface',
          borderColor: 'gray.border.default',
          color: 'gray.fg.default',
          _checked: {
            boxShadow: '0 0 0 1px var(--shadow-color)',
            boxShadowColor: 'colorPalette.bg.default',
            borderColor: 'colorPalette.bg.default',
          },
        },
        itemIndicator: {
          ...appearance.itemIndicator,
          borderWidth: '1px',
          borderColor: 'gray.border.strong',
          _checked: {
            background: 'colorPalette.bg.default',
            color: 'colorPalette.fg.onSolid',
            borderColor: 'colorPalette.bg.default',
            _after: {
              background: 'colorPalette.fg.onSolid',
            },
          },
        },
      },
      solid: {
        ...appearance,
        item: {
          ...appearance.item,
          borderWidth: '1px',
          _checked: {
            bg: 'colorPalette.bg.default',
            color: 'colorPalette.fg.onSolid',
            borderColor: 'colorPalette.bg.default',
          },
        },
        itemIndicator: {
          ...appearance.itemIndicator,
          borderWidth: '1px',
          borderColor: 'gray.border.strong',
          _checked: {
            background: 'colorPalette.fg.onSolid',
            color: 'colorPalette.bg.default',
            borderColor: 'colorPalette.fg.onSolid',
            _after: {
              bg: 'colorPalette.bg.default',
            },
          },
        },
      },
    },
    size: {
      unstyled: {},
      sm: {
        ...sizeStyles,
        itemControl: { gap: '1.5', p: '3' },
        itemAddon: { px: '3', py: '1.5' },
        itemIndicator: { boxSize: '4.5', _after: { boxSize: '1.5' } },
        itemText: { textStyle: 'sm' },
      },
      md: {
        ...sizeStyles,
        itemControl: { gap: '2', p: '4' },
        itemAddon: { px: '4', py: '2' },
        itemIndicator: { boxSize: '5', _after: { boxSize: '2' } },
        itemText: { textStyle: 'sm' },
      },
      lg: {
        ...sizeStyles,
        itemControl: { gap: '3', p: '4' },
        itemAddon: { px: '4', py: '2' },
        itemIndicator: { boxSize: '5.5', _after: { boxSize: '2.5' } },
        itemText: { textStyle: 'md' },
      },
    },
    justify: {
      start: { item: { '--radio-card-justify': 'flex-start' } },
      center: { item: { '--radio-card-justify': 'center' } },
      end: { item: { '--radio-card-justify': 'flex-end' } },
    },
    align: {
      start: { item: { '--radio-card-align': 'flex-start' }, itemControl: { textAlign: 'start' } },
      center: { item: { '--radio-card-align': 'center' }, itemControl: { textAlign: 'center' } },
      end: { item: { '--radio-card-align': 'flex-end' }, itemControl: { textAlign: 'end' } },
    },
    orientation: {
      horizontal: { itemControl: { flexDirection: 'row' } },
      vertical: { itemControl: { flexDirection: 'column' } },
    },
  },
})
