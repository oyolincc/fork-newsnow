import { accordionAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const appearance = {
  root: { '--accordion-radius': 'radii.sm' },
  itemTrigger: {
    borderRadius: 'var(--accordion-radius)',
    color: 'gray.fg.default',
    cursor: 'pointer',
    fontWeight: 'semibold',
    _focusVisible: { outline: '2px solid', outlineColor: 'colorPalette.ring' },
    _disabled: { layerStyle: 'disabled' },
  },
  itemIndicator: { color: 'gray.fg.subtle' },
  itemBody: { color: 'gray.fg.muted' },
  itemContent: { borderRadius: 'var(--accordion-radius)' },
} as const

export const accordion = defineSlotRecipe({
  className: 'app-accordion',
  jsx: ['Accordion.Root', 'Accordion.RootProvider'],
  slots: accordionAnatomy.extendWith('itemBody').keys(),
  base: {
    root: { width: 'full' },
    item: { overflowAnchor: 'none' },
    itemTrigger: {
      alignItems: 'center',
      display: 'flex',
      gap: '3',
      justifyContent: 'space-between',
      textAlign: 'start',
      textStyle: 'lg',
      width: 'full',
    },
    itemIndicator: {
      transition: 'rotate 0.2s',
      _motionReduce: { transition: 'none' },
      transformOrigin: 'center',
      _open: { rotate: '180deg' },
      _icon: { width: '1.2em', height: '1.2em' },
    },
    itemBody: { pb: 'calc(var(--accordion-padding-y) * 2)' },
    itemContent: {
      overflow: 'hidden',
      _open: {
        _motionSafe: { animationName: 'expand-height, fade-in', animationDuration: 'normal' },
      },
      _closed: {
        _motionSafe: { animationName: 'collapse-height, fade-out', animationDuration: 'normal' },
      },
      _motionReduce: { animation: 'none' },
    },
  },
  defaultVariants: { size: 'md', variant: 'outline' },
  variants: {
    variant: {
      outline: { ...appearance, item: { borderBottomWidth: '1px' } },
      plain: appearance,
      unstyled: {},
    },
    size: {
      md: {
        root: { '--accordion-padding-x': 'spacing.4', '--accordion-padding-y': 'spacing.2.5' },
        itemTrigger: { textStyle: 'md', py: 'var(--accordion-padding-y)' },
      },
    },
  },
})
