import { collapsibleAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const collapsible = defineSlotRecipe({
  className: 'app-collapsible',
  jsx: ['Collapsible.Root', 'Collapsible.RootProvider'],
  slots: collapsibleAnatomy.keys(),
  base: {
    content: {
      overflow: 'hidden',
      _open: {
        _motionSafe: {
          animationName: 'expand-height, fade-in',
          animationDuration: 'slow',
        },
      },
      _closed: {
        _motionSafe: {
          animationName: 'collapse-height, fade-out',
          animationDuration: 'normal',
        },
      },
      _motionReduce: { animation: 'none' },
    },
  },
})
