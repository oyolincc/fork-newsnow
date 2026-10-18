import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  root: { '--timeline-thickness': '1px' },
  item: {
    '--timeline-content-gap': '{spacing.6}',
    gap: '4',
    _last: { '--timeline-content-gap': '0' },
  },
  separator: {
    borderInlineStartWidth: 'var(--timeline-thickness)',
    marginInlineStart: 'calc(-1 * var(--timeline-thickness) / 2)',
    insetInlineStart: 'calc(var(--timeline-indicator-size) / 2)',
  },
  indicator: { boxSize: 'var(--timeline-indicator-size)', fontSize: 'var(--timeline-font-size)' },
  content: { pb: 'var(--timeline-content-gap)', gap: '2' },
  title: { gap: '1.5' },
  description: { textStyle: 'xs' },
} as const

const appearance = {
  separator: { borderColor: 'gray.border.strong' },
  indicator: {
    outline: '2px solid {colors.gray.bg.page}',
    borderRadius: 'full',
    fontWeight: 'medium',
  },
  title: { fontWeight: 'medium' },
  description: { color: 'gray.fg.muted' },
} as const

export const timeline = defineSlotRecipe({
  className: 'app-timeline',
  jsx: ['Timeline.Root'],
  slots: ['root', 'item', 'connector', 'separator', 'indicator', 'content', 'title', 'description'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
      '--timeline-separator-display': 'block',
    },
    item: { display: 'flex', position: 'relative', alignItems: 'flex-start', flexShrink: '0' },
    connector: { alignSelf: 'stretch', position: 'relative' },
    separator: {
      display: 'var(--timeline-separator-display)',
      position: 'absolute',
      insetBlock: '0',
    },
    indicator: {
      position: 'relative',
      flexShrink: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      _icon: { boxSize: '1em' },
    },
    content: { display: 'flex', flexDirection: 'column', width: 'full', minWidth: '0' },
    title: { display: 'flex', flexWrap: 'wrap', alignItems: 'center' },
  },
  variants: {
    variant: {
      subtle: {
        ...appearance,
        indicator: {
          ...appearance.indicator,
          bg: 'colorPalette.bg.subtle',
          color: 'colorPalette.fg.default',
        },
      },
      solid: {
        ...appearance,
        indicator: {
          ...appearance.indicator,
          bg: 'colorPalette.bg.default',
          color: 'colorPalette.fg.onSolid',
        },
      },
      outline: {
        ...appearance,
        indicator: {
          ...appearance.indicator,
          bg: 'gray.bg.page',
          borderWidth: '1px',
          borderColor: 'colorPalette.border.strong',
          color: 'colorPalette.fg.default',
        },
      },
      plain: appearance,
      unstyled: {},
    },
    showLastSeparator: {
      true: { item: { _last: { '--timeline-separator-display': 'block' } } },
      false: { item: { _last: { '--timeline-separator-display': 'none' } } },
    },
    size: {
      sm: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--timeline-indicator-size': '{sizes.4}',
          '--timeline-font-size': '{fontSizes.2xs}',
        },
        title: { ...sizeStyles.title, textStyle: 'xs' },
      },
      md: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--timeline-indicator-size': '{sizes.5}',
          '--timeline-font-size': '{fontSizes.xs}',
        },
        title: { ...sizeStyles.title, textStyle: 'sm' },
      },
      lg: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--timeline-indicator-size': '{sizes.6}',
          '--timeline-font-size': '{fontSizes.xs}',
        },
        title: { ...sizeStyles.title, mt: '0.5', textStyle: 'sm' },
      },
      xl: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--timeline-indicator-size': '{sizes.8}',
          '--timeline-font-size': '{fontSizes.sm}',
        },
        title: { ...sizeStyles.title, mt: '1.5', textStyle: 'sm' },
      },
      unstyled: {},
    },
  },
  defaultVariants: { size: 'md', variant: 'solid', showLastSeparator: false },
})
