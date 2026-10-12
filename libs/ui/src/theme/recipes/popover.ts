import { popoverAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const popover = defineSlotRecipe({
  className: 'popover',
  jsx: ['Popover.Root', 'Popover.RootProvider'],
  slots: popoverAnatomy.extendWith('header', 'body', 'footer').keys(),
  base: {
    content: {
      '--popover-z-index': 'zIndex.popover',
      '--popover-bg': 'colors.gray.bg.surface',
      '--popover-padding': 'spacing.4',

      background: 'var(--popover-bg)',
      borderRadius: 'md',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'var(--available-height)',
      outline: '0',
      position: 'relative',
      textStyle: 'sm',
      transformOrigin: 'var(--transform-origin)',
      width: 'xs',
      zIndex: 'calc(var(--popover-z-index) + var(--layer-index, 0))',
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
    title: {
      color: 'gray.fg.default',
      fontWeight: 'medium',
      textStyle: 'md',
    },
    description: {
      color: 'gray.fg.muted',
      textStyle: 'sm',
    },
    closeTrigger: {
      position: 'absolute',
      top: '1',
      right: '1',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      pt: 'var(--popover-padding)',
      px: 'var(--popover-padding)',
    },
    body: { p: 'var(--popover-padding)', display: 'flex', flex: '1', flexDirection: 'column' },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '3',
      paddingInline: 'var(--popover-padding)',
      paddingBottom: 'var(--popover-padding)',
    },
    arrow: {
      '--arrow-size': 'sizes.3',
      '--arrow-background': 'var(--popover-bg)',
    },
    arrowTip: {
      borderTopWidth: '0.5px',
      borderInlineStartWidth: '0.5px',
    },
  },
})
