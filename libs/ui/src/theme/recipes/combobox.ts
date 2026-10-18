import { comboboxAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'
import { input } from './input'

const sizeStyles = {
  root: { gap: '1.5' },
  label: { textStyle: 'label' },
  content: {
    maxH: 'min(var(--available-height), {sizes.96})',
    minWidth: 'max(var(--reference-width), {sizes.40})',
  },
  indicatorGroup: { gap: '1' },
  itemGroupLabel: { gap: '1px' },
} as const

const appearance = {
  content: { background: 'gray.bg.surface', borderRadius: 'sm', boxShadow: 'md', outline: '0' },
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
    _after: { content: '""', width: '100%', height: '1px', bg: 'gray.border.subtle' },
  },
  itemIndicator: { color: 'colorPalette.fg.default' },
  trigger: { color: 'gray.fg.subtle' },
  clearTrigger: { color: 'gray.fg.muted' },
  empty: { color: 'gray.fg.subtle' },
} as const

export const combobox = defineSlotRecipe({
  className: 'app-combobox',
  jsx: ['Combobox.Root', 'Combobox.RootProvider'],
  slots: comboboxAnatomy.extendWith('indicatorGroup').keys(),
  base: {
    root: { display: 'flex', flexDirection: 'column', width: 'full' },
    input: { ...input.base, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    control: { position: 'relative' },
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
      '&[data-empty]:not(:has([data-scope=combobox][data-part=empty]))': { opacity: 0 },
      _motionReduce: { animation: 'none' },
    },
    item: { alignItems: 'center', display: 'flex', justifyContent: 'space-between' },
    itemGroup: { display: 'flex', flexDirection: 'column' },
    itemGroupLabel: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    itemIndicator: { '&[hidden]': { display: 'none' } },
    indicatorGroup: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pos: 'absolute',
      insetEnd: '0',
      top: '0',
      bottom: '0',
    },
    empty: { display: 'flex', alignItems: 'center' },
  },
  defaultVariants: { size: 'md', variant: 'outline' },
  variants: {
    variant: {
      outline: { ...appearance, input: input.variants.variant.outline },
      surface: { ...appearance, input: input.variants.variant.surface },
      subtle: { ...appearance, input: input.variants.variant.subtle },
      unstyled: {},
    },
    size: {
      xs: {
        ...sizeStyles,
        input: { ...input.variants.size.xs, pe: '12' },
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'sm' },
        item: { px: '1', minH: '8', gap: '2', _icon: { boxSize: '3.5' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '1', height: '8' },
        indicatorGroup: { ...sizeStyles.indicatorGroup, px: '2', _icon: { boxSize: '3.5' } },
        empty: { px: '1', minH: '8' },
      },
      sm: {
        ...sizeStyles,
        input: { ...input.variants.size.sm, pe: '14' },
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'sm' },
        item: { px: '1.5', minH: '9', gap: '2', _icon: { boxSize: '4' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '1.5', height: '9' },
        indicatorGroup: { ...sizeStyles.indicatorGroup, px: '2.5', _icon: { boxSize: '4' } },
        empty: { px: '1.5', minH: '9' },
      },
      md: {
        ...sizeStyles,
        input: { ...input.variants.size.md, pe: '14' },
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'md' },
        indicatorGroup: { ...sizeStyles.indicatorGroup, px: '3', _icon: { boxSize: '4' } },
        item: { px: '2', minH: '10', gap: '2', _icon: { boxSize: '4' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '2', height: '10' },
        empty: { px: '2', minH: '10' },
      },
      lg: {
        ...sizeStyles,
        input: { ...input.variants.size.lg, pe: '16' },
        content: { ...sizeStyles.content, p: '1', gap: '0.5', textStyle: 'md' },
        item: { px: '2.5', minH: '11', gap: '2', _icon: { boxSize: '4.5' } },
        itemGroup: { gap: '0.5' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '2.5', height: '11' },
        indicatorGroup: { ...sizeStyles.indicatorGroup, px: '3.5', _icon: { boxSize: '4.5' } },
        empty: { px: '2.5', minH: '11' },
      },
      xl: {
        ...sizeStyles,
        input: { ...input.variants.size.xl, pe: '16' },
        content: { ...sizeStyles.content, p: '1', gap: '1', textStyle: 'lg' },
        item: { px: '3', minH: '12', gap: '3', _icon: { boxSize: '5' } },
        itemGroup: { gap: '1' },
        itemGroupLabel: { ...sizeStyles.itemGroupLabel, px: '3', height: '12' },
        indicatorGroup: { ...sizeStyles.indicatorGroup, px: '4', _icon: { boxSize: '5' } },
        empty: { px: '3', minH: '12' },
      },
      unstyled: {},
    },
  },
})
