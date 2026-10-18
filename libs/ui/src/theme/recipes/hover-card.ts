import { hoverCardAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const hoverCard = defineSlotRecipe({
  className: 'app-hover-card',
  jsx: ['HoverCard.Root', 'HoverCard.RootProvider'],
  slots: hoverCardAnatomy.keys(),
  base: {
    content: {
      '--hovercard-bg': 'colors.gray.bg.surface',

      bg: 'var(--hovercard-bg)',
      borderRadius: 'md',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '80',
      outline: '0',
      padding: '4',
      position: 'relative',
      textStyle: 'sm',
      transformOrigin: 'var(--transform-origin)',
      zIndex: 'popover',
      _open: {
        _motionSafe: {
          animationStyle: 'slide-fade-in',
          animationDuration: 'fast',
        },
      },
      _closed: {
        _motionSafe: {
          animationStyle: 'slide-fade-out',
          animationDuration: 'faster',
        },
      },
      _motionReduce: { animation: 'none' },
    },
    arrow: {
      '--arrow-size': 'sizes.3',
      '--arrow-background': 'var(--hovercard-bg)',
    },
    arrowTip: {
      borderTopWidth: '0.5px',
      borderInlineStartWidth: '0.5px',
    },
  },
})
