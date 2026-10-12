import { selectAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  root: { gap: '1.5' },
  label: { textStyle: 'sm' },
  content: {
    maxH: 'min(var(--available-height), {sizes.96})',
    minWidth: 'max(var(--reference-width), {sizes.40})',
  },
  indicatorGroup: { gap: '1' },
  itemGroupLabel: { gap: '1px' },
} as const

const appearance = {
  content: { background: 'gray.bg.surface', borderRadius: 'sm', boxShadow: 'md', outline: 0 },
  item: {
    borderRadius: 'xs',
    cursor: 'pointer',
    _hover: { background: 'gray.bg.surface.hover' },
    _highlighted: { background: 'gray.bg.surface.hover' },
    _selected: {},
    _disabled: { layerStyle: 'disabled' },
  },
  itemGroupLabel: {
    color: 'gray.fg.subtle',
    fontWeight: 'medium',
    _after: { content: '""', width: '100%', height: '1px', bg: 'gray.4' },
  },
  itemIndicator: { color: 'colorPalette.fg.default' },
  label: { fontWeight: 'medium' },
  indicator: { color: { base: 'gray.fg.subtle' } },
  trigger: {
    borderRadius: 'sm',
    cursor: 'pointer',
    outline: '0',
    transition: 'common',
    _placeholderShown: { color: 'gray.fg.subtle' },
    _disabled: { layerStyle: 'disabled' },
  },
} as const

export const select = defineSlotRecipe({
  className: 'select',
  jsx: ['Select.Root', 'Select.RootProvider'],
  slots: selectAnatomy.extendWith('indicatorGroup').keys(),
  base: {
    root: { display: 'flex', flexDirection: 'column', width: 'full' },
    content: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      zIndex: 'dropdown',
      _open: {
        _motionSafe: { animationStyle: 'slide-fade-in', animationDuration: 'slow' },
      },
      _closed: {
        _motionSafe: { animationStyle: 'slide-fade-out', animationDuration: 'fastest' },
      },
      _motionReduce: { animation: 'none' },
    },
    item: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      userSelect: 'none',
    },
    indicatorGroup: { display: 'flex', alignItems: 'center', pointerEvents: 'none' },
    indicator: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    itemGroupLabel: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    itemIndicator: { '&[hidden]': { display: 'none' } },
    label: { userSelect: 'none' },
    trigger: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '0',
      textAlign: 'start',
      userSelect: 'none',
      width: 'full',
    },
    valueText: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  },
  defaultVariants: { size: 'md', variant: 'outline' },
  variants: {
    variant: {
      outline: {
        ...appearance,
        trigger: {
          ...appearance.trigger,
          borderWidth: '1px',
          borderColor: 'gray.border.strong',
          focusVisibleRing: 'inside',
        },
      },
      surface: {
        ...appearance,
        trigger: {
          ...appearance.trigger,
          bg: 'gray.bg.surface',
          borderWidth: '1px',
          borderColor: 'gray.border.default',
          focusVisibleRing: 'inside',
        },
      },
      unstyled: {},
    },
    size: {
      xs: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'sm' },
        item: { px: '1', minH: '8', gap: '2', _icon: { boxSize: '3.5' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '1', height: '8' },
        trigger: { px: '2', h: '8', textStyle: 'sm', gap: '2', _icon: { boxSize: '3.5' } },
      },
      sm: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'sm' },
        item: { px: '1.5', minH: '9', gap: '2', _icon: { boxSize: '4' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '1.5', height: '9' },
        trigger: { px: '2.5', h: '9', textStyle: 'sm', gap: '2', _icon: { boxSize: '4' } },
      },
      md: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'md' },
        item: { px: '2', minH: '10', gap: '2', _icon: { boxSize: '4' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '2', height: '10' },
        trigger: { px: '3', h: '10', textStyle: 'md', gap: '2', _icon: { boxSize: '4' } },
      },
      lg: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'md' },
        item: { px: '2.5', minH: '11', gap: '2', _icon: { boxSize: '4.5' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '2.5', height: '11' },
        trigger: { px: '3.5', h: '11', textStyle: 'md', gap: '2', _icon: { boxSize: '4.5' } },
      },
      xl: {
        ...sizeStyles,
        content: { ...sizeStyles.content, p: '1', gap: '1', textStyle: 'lg' },
        item: { px: '3', minH: '12', gap: '3', _icon: { boxSize: '5' } },
        itemGroup: { gap: '1' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '3', height: '12' },
        trigger: { px: '4', h: '12', textStyle: 'lg', gap: '3', _icon: { boxSize: '5' } },
      },
      unstyled: {},
    },
  },
})
