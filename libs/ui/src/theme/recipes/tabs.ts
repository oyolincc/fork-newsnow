import { tabsAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = { root: { _horizontal: { gap: '2' }, _vertical: { gap: '4' } } } as const

const appearance = {
  trigger: {
    cursor: 'pointer',
    fontWeight: 'semibold',
    outline: '0',
    _disabled: { layerStyle: 'disabled' },
    _focusVisible: { focusVisibleRing: 'outside' },
  },
  content: { focusVisibleRing: 'inside' },
} as const

export const tabs = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  className: 'tabs',
  jsx: ['Tabs.Root', 'Tabs.RootProvider'],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'start',
      _horizontal: { flexDirection: 'column' },
      _vertical: { flexDirection: 'row' },
    },
    list: {
      display: 'flex',
      position: 'relative',
      isolation: 'isolate',
      _horizontal: { flexDirection: 'row' },
      _vertical: { flexDirection: 'column' },
    },
    trigger: {
      alignItems: 'center',
      display: 'flex',
      position: 'relative',
      _focusVisible: { zIndex: 1 },
    },
    content: { _horizontal: { width: '100%' }, _vertical: { height: '100%' } },
    indicator: { width: 'var(--width)', height: 'var(--height)', zIndex: -1 },
  },
  variants: {
    size: {
      xs: {
        ...sizeStyles,
        list: { gap: '1' },
        trigger: { h: '8', minW: '8', textStyle: 'xs', px: '3', gap: '2' },
      },
      sm: {
        ...sizeStyles,
        list: { gap: '1' },
        trigger: { h: '9', minW: '9', textStyle: 'sm', px: '3.5', gap: '2' },
      },
      md: {
        ...sizeStyles,
        list: { gap: '1' },
        trigger: { h: '10', minW: '10', textStyle: 'sm', px: '4', gap: '2' },
      },
      lg: {
        ...sizeStyles,
        list: { gap: '1' },
        trigger: { h: '11', minW: '11', textStyle: 'md', px: '4.5', gap: '2' },
      },
      unstyled: {},
    },
    variant: {
      line: {
        ...appearance,
        root: { alignItems: 'stretch' },
        list: { _horizontal: { borderBottomWidth: '1px' }, _vertical: { borderStartWidth: '1px' } },
        indicator: {
          background: 'colorPalette.bg.default',
          _horizontal: { bottom: '0', height: '0.5', transform: 'translateY(1px)' },
          _vertical: { left: '0', width: '0.5', transform: 'translateX(-1px)' },
        },
        trigger: {
          ...appearance.trigger,
          color: 'gray.fg.muted',
          _selected: { color: 'colorPalette.fg.default' },
        },
      },
      subtle: {
        ...appearance,
        trigger: {
          ...appearance.trigger,
          color: 'gray.fg.muted',
          _selected: { color: 'colorPalette.fg.default' },
        },
        indicator: {
          bg: 'colorPalette.bg.subtle',
          color: 'colorPalette.fg.default',
          borderRadius: 'sm',
        },
      },
      enclosed: {
        ...appearance,
        list: {
          bg: { _light: 'gray.2', _dark: 'gray.1' },
          boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
          boxShadowColor: 'gray.border.subtle',
          borderRadius: 'md',
          p: '1',
        },
        trigger: {
          ...appearance.trigger,
          color: 'gray.fg.muted',
          _selected: { color: 'colorPalette.fg.default' },
        },
        indicator: {
          borderRadius: 'sm',
          boxShadow: { _light: 'xs', _dark: 'none' },
          bg: { _light: 'white', _dark: 'gray.2' },
        },
      },
      unstyled: {},
    },
    fitted: {
      true: {
        root: { alignItems: 'stretch' },
        trigger: { flex: 1, textAlign: 'center', justifyContent: 'center' },
      },
    },
  },
  defaultVariants: { size: 'md', variant: 'line' },
})
