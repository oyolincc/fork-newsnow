import { tooltipAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const tooltip = defineSlotRecipe({
  className: 'tooltip',
  jsx: ['Tooltip.Root', 'Tooltip.RootProvider', 'Tooltip'],
  slots: tooltipAnatomy.keys(),
  base: {
    content: {
      '--tooltip-bg': 'colors.gray.bg.default',
      bg: 'var(--tooltip-bg)',
      color: 'gray.fg.onSolid',
      borderRadius: 'sm',
      boxShadow: 'sm',
      fontWeight: 'semibold',
      px: '2',
      py: '1.5',
      textStyle: 'xs',
      maxWidth: 'xs',
      _open: {
        _motionSafe: {
          animationStyle: 'scale-fade-in',
          animationDuration: 'fast',
        },
      },
      _closed: {
        _motionSafe: {
          animationStyle: 'scale-fade-out',
          animationDuration: 'faster',
        },
      },
      _motionReduce: { animation: 'none' },
    },
    arrow: {
      '--arrow-size': 'sizes.2',
      '--arrow-background': 'var(--tooltip-bg)',
    },
    arrowTip: {
      borderTopWidth: '1px',
      borderInlineStartWidth: '1px',
      borderColor: 'var(--tooltip-bg)',
    },
  },
})
