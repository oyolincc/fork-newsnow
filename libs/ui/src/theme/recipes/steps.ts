import { stepsAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  list: { '--steps-gutter': '{spacing.3}', '--steps-thickness': '2px' },
  separator: {
    _horizontal: { height: 'var(--steps-thickness)', mx: 'var(--steps-gutter)' },
    _vertical: {
      width: 'var(--steps-thickness)',
      maxHeight: 'calc(100% - var(--steps-size) - var(--steps-gutter) * 2)',
      top: 'calc(var(--steps-size) + var(--steps-gutter))',
      insetInlineStart: 'calc((var(--steps-size) - var(--steps-thickness)) / 2)',
    },
  },
  indicator: { boxSize: 'var(--steps-size)', _icon: { boxSize: 'var(--steps-icon-size)' } },
  item: { gap: '3' },
  trigger: { gap: '3' },
} as const

const appearance = {
  root: { color: 'gray.fg.default' },
  title: { fontWeight: 'medium', color: 'gray.fg.default' },
  description: { color: 'gray.fg.muted' },
  separator: { bg: 'gray.border.strong' },
  indicator: { borderRadius: 'full', fontWeight: 'medium' },
  trigger: {
    outline: '0',
    focusVisibleRing: 'outside',
    borderRadius: 'sm',
    cursor: 'pointer',
    _disabled: { cursor: 'not-allowed', opacity: '0.5' },
  },
  content: { outline: '0', focusVisibleRing: 'outside' },
} as const

export const steps = defineSlotRecipe({
  className: 'steps',
  jsx: ['Steps.Root', 'Steps.RootProvider'],
  slots: stepsAnatomy.extendWith('title', 'description').keys(),
  base: {
    root: {
      display: 'flex',
      width: 'full',
      _horizontal: { flexDirection: 'column' },
      _vertical: { flexDirection: 'row' },
    },
    list: {
      display: 'flex',
      justifyContent: 'space-between',
      _horizontal: { flexDirection: 'row', alignItems: 'center' },
      _vertical: { flexDirection: 'column', alignItems: 'flex-start' },
    },
    separator: {
      flex: '1',
      _horizontal: { width: 'full' },
      _vertical: { position: 'absolute', height: 'full' },
    },
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: '0',
      _icon: { flexShrink: '0' },
    },
    item: {
      position: 'relative',
      display: 'flex',
      flex: '1 0 0',
      _horizontal: { alignItems: 'center' },
      _vertical: { alignItems: 'flex-start' },
      '&:last-of-type': { flex: 'initial', '& [data-part=separator]': { display: 'none' } },
    },
    trigger: { display: 'flex', alignItems: 'center', textAlign: 'start' },
  },
  variants: {
    variant: {
      solid: {
        ...appearance,
        indicator: {
          ...appearance.indicator,
          '&[data-incomplete]': {
            borderWidth: 'var(--steps-thickness, 2px)',
            borderColor: 'gray.border.strong',
          },
          '&[data-current]': {
            bg: 'colorPalette.bg.subtle',
            borderWidth: 'var(--steps-thickness, 2px)',
            borderColor: 'colorPalette.bg.default',
            color: 'colorPalette.fg.default',
          },
          '&[data-complete]': { bg: 'colorPalette.bg.default', color: 'colorPalette.fg.onSolid' },
        },
        separator: {
          ...appearance.separator,
          '&[data-complete]': { bg: 'colorPalette.bg.default' },
        },
      },
      subtle: {
        ...appearance,
        indicator: {
          ...appearance.indicator,
          '&[data-incomplete]': { bg: 'gray.bg.subtle' },
          '&[data-current]': { bg: 'colorPalette.bg.subtle', color: 'colorPalette.fg.default' },
          '&[data-complete]': { bg: 'colorPalette.bg.surface', color: 'colorPalette.fg.default' },
        },
        separator: {
          ...appearance.separator,
          '&[data-complete]': { bg: 'colorPalette.border.default' },
        },
      },
      unstyled: {},
    },
    size: {
      xs: {
        ...sizeStyles,
        root: { gap: '2.5' },
        list: {
          ...sizeStyles.list,
          '--steps-size': '{sizes.6}',
          '--steps-icon-size': '{sizes.3.5}',
          textStyle: 'xs',
        },
        title: { textStyle: 'sm' },
      },
      sm: {
        ...sizeStyles,
        root: { gap: '3' },
        list: {
          ...sizeStyles.list,
          '--steps-size': '{sizes.8}',
          '--steps-icon-size': '{sizes.4}',
          textStyle: 'xs',
        },
        title: { textStyle: 'sm' },
      },
      md: {
        ...sizeStyles,
        root: { gap: '4' },
        list: {
          ...sizeStyles.list,
          '--steps-size': '{sizes.10}',
          '--steps-icon-size': '{sizes.4}',
          textStyle: 'sm',
        },
        title: { textStyle: 'sm' },
      },
      lg: {
        ...sizeStyles,
        root: { gap: '6' },
        list: {
          ...sizeStyles.list,
          '--steps-size': '{sizes.11}',
          '--steps-icon-size': '{sizes.5}',
          textStyle: 'md',
        },
        title: { textStyle: 'md' },
      },
      unstyled: {},
    },
  },
  defaultVariants: { size: 'md', variant: 'solid' },
})
