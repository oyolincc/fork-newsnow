import { menuAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  content: {
    maxH: 'min(var(--available-height), {sizes.96})',
    minWidth: 'max(var(--reference-width), {sizes.40})',
  },
  itemGroupLabel: { gap: '1px' },
} as const

export const menu = defineSlotRecipe({
  className: 'menu',
  jsx: ['Menu.Root', 'Menu.RootProvider'],
  slots: menuAnatomy.keys(),
  base: {
    content: {
      '--menu-z-index': 'zIndex.dropdown',
      bg: 'gray.bg.surface',
      borderRadius: 'md',
      boxShadow: 'md',
      display: 'flex',
      flexDirection: 'column',
      outline: '0',
      overflow: 'hidden',
      overflowY: 'auto',
      position: 'relative',
      zIndex: 'calc(var(--menu-z-index) + var(--layer-index, 0))',
      _open: {
        _motionSafe: { animationStyle: 'slide-fade-in', animationDuration: 'fast' },
      },
      _closed: {
        _motionSafe: { animationStyle: 'slide-fade-out', animationDuration: 'faster' },
      },
      _motionReduce: { animation: 'none' },
    },
    item: {
      alignItems: 'center',
      borderRadius: 'sm',
      display: 'flex',
      flex: '0 0 auto',
      outline: '0',
      textAlign: 'start',
      textDecoration: 'none',
      userSelect: 'none',
      width: '100%',
      _highlighted: { bg: 'gray.bg.surface.hover' },
      _disabled: { layerStyle: 'disabled' },
    },
    trigger: { _focusVisible: { focusVisibleRing: 'outside' } },
    itemGroupLabel: {
      alignItems: 'flex-start',
      color: 'gray.fg.subtle',
      display: 'flex',
      flexDirection: 'column',
      fontWeight: 'medium',
      justifyContent: 'center',
      _after: { content: '""', width: '100%', height: '1px', bg: 'gray.border.subtle' },
    },
    itemIndicator: {
      '&[hidden]': { display: 'none' },
      justifyContent: 'flex-end',
      display: 'flex',
      flex: '1',
      _checked: { _icon: { color: 'colorPalette.fg.default' } },
    },
  },
  defaultVariants: { size: 'md' },
  variants: {
    size: {
      xs: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'sm' },
        item: { px: '1', minH: '8', gap: '2', _icon: { boxSize: '3.5' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '1', height: '8' },
        separator: { mx: '-1', my: '0.5' },
      },
      sm: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'sm' },
        item: { px: '1.5', minH: '9', gap: '2', _icon: { boxSize: '4' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '1.5', height: '9' },
        separator: { mx: '-1.5', my: '0.5' },
      },
      md: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'md' },
        item: { px: '2', minH: '10', gap: '2', _icon: { boxSize: '4' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '2', height: '10' },
        separator: { mx: '-2', my: '0.5' },
      },
      lg: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'md' },
        item: { px: '2.5', minH: '11', gap: '2', _icon: { boxSize: '4.5' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '2.5', height: '11' },
        separator: { mx: '-2.5', my: '0.5' },
      },
      xl: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '1', textStyle: 'lg' },
        item: { px: '3', minH: '12', gap: '3', _icon: { boxSize: '5' } },
        itemGroup: { gap: '1' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '3', height: '12' },
        separator: { mx: '-3', my: '0' },
      },
      unstyled: {},
    },
  },
})
