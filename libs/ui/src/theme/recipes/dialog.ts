import { dialogAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  title: { textStyle: 'lg' },
  description: { textStyle: 'sm' },
  closeTrigger: { top: '3', insetEnd: '3' },
  content: { textStyle: 'sm', py: { base: '4', md: '6' }, gap: { base: '4', md: '6' } },
  header: { gap: '0.5', px: { base: '4', md: '6' } },
  body: { px: { base: '4', md: '6' } },
  footer: { gap: '3', px: { base: '4', md: '6' } },
} as const

export const dialog = defineSlotRecipe({
  className: 'app-dialog',
  jsx: ['Dialog.Root', 'Dialog.RootProvider'],
  slots: dialogAnatomy.extendWith('header', 'body', 'footer').keys(),
  base: {
    backdrop: {
      background: 'black.a7',
      height: '100dvh',
      left: '0',
      position: 'fixed',
      top: '0',
      width: '100dvw',
      zIndex: 'var(--z-index)',
      _open: {
        _motionSafe: {
          animationName: 'fade-in',
          animationTimingFunction: 'out',
          animationDuration: 'normal',
        },
      },
      _closed: {
        _motionSafe: {
          animationName: 'fade-out',
          animationTimingFunction: 'in',
          animationDuration: 'fast',
        },
      },
      _motionReduce: { animation: 'none' },
    },
    positioner: {
      '--dialog-z-index': 'zIndex.modal',
      display: 'flex',
      height: '100dvh',
      justifyContent: 'center',
      left: 0,
      overscrollBehaviorY: 'none',
      position: 'fixed',
      top: 0,
      width: '100dvw',
      zIndex: 'calc(var(--dialog-z-index) + var(--layer-index, 0))',
    },
    title: { fontWeight: 'semibold' },
    description: { color: 'gray.fg.muted' },
    closeTrigger: { pos: 'absolute' },
    content: {
      '--dialog-z-index': 'zIndex.modal',
      bg: 'gray.bg.surface',
      borderRadius: 'md',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      my: 'var(--dialog-margin, var(--dialog-base-margin))',
      outline: 0,
      position: 'relative',
      width: '100%',
      zIndex: 'calc(var(--dialog-z-index) + var(--layer-index, 0))',
      _open: {
        _motionSafe: { animationDuration: 'slowest' },
      },
      _closed: {
        _motionSafe: { animationDuration: 'normal' },
      },
      _motionReduce: { animation: 'none' },
    },
    header: { display: 'flex', flexDirection: 'column', flex: '0' },
    body: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'flex-start' },
    footer: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '0' },
  },
  defaultVariants: {
    size: 'md',
    scrollBehavior: 'outside',
    placement: 'center',
    motionPreset: 'scale',
  },
  variants: {
    motionPreset: {
      scale: {
        content: {
          _open: {
            _motionSafe: { animationName: 'scale-in, fade-in' },
          },
          _closed: {
            _motionSafe: { animationName: 'scale-out, fade-out' },
          },
        },
      },
      'slide-in-bottom': {
        content: {
          _open: {
            _motionSafe: { animationName: 'slide-from-bottom, fade-in' },
          },
          _closed: {
            _motionSafe: { animationName: 'slide-to-bottom, fade-out' },
          },
        },
      },
      'slide-in-top': {
        content: {
          _open: {
            _motionSafe: { animationName: 'slide-from-top, fade-in' },
          },
          _closed: {
            _motionSafe: { animationName: 'slide-to-top, fade-out' },
          },
        },
      },
      'slide-in-left': {
        content: {
          _open: {
            _motionSafe: { animationName: 'slide-from-left, fade-in' },
          },
          _closed: {
            _motionSafe: { animationName: 'slide-to-left, fade-out' },
          },
        },
      },
      'slide-in-right': {
        content: {
          _open: {
            _motionSafe: { animationName: 'slide-from-right, fade-in' },
          },
          _closed: {
            _motionSafe: { animationName: 'slide-to-right, fade-out' },
          },
        },
      },
      none: {
        backdrop: { _open: { animation: 'none' }, _closed: { animation: 'none' } },
        content: { _open: { animation: 'none' }, _closed: { animation: 'none' } },
      },
    },
    size: {
      xs: { ...sizeStyles, content: { ...sizeStyles.content, maxW: 'xs' } },
      sm: { ...sizeStyles, content: { ...sizeStyles.content, maxW: 'sm' } },
      md: { ...sizeStyles, content: { ...sizeStyles.content, maxW: 'md' } },
      lg: { ...sizeStyles, content: { ...sizeStyles.content, maxW: 'lg' } },
      xl: { ...sizeStyles, content: { ...sizeStyles.content, maxW: 'xl' } },
      cover: {
        ...sizeStyles,
        positioner: { padding: '8' },
        content: { ...sizeStyles.content, width: '100%', height: '100%', '--dialog-margin': '0' },
      },
      full: {
        ...sizeStyles,
        content: {
          ...sizeStyles.content,
          maxW: '100dvw',
          minH: '100dvh',
          '--dialog-margin': '0',
          borderRadius: '0',
        },
      },
      unstyled: {},
    },
    placement: {
      center: {
        positioner: { alignItems: 'center' },
        content: { '--dialog-base-margin': 'auto', mx: 'auto' },
      },
      top: {
        positioner: { alignItems: 'flex-start' },
        content: { '--dialog-base-margin': 'spacing.16', mx: 'auto' },
      },
      bottom: {
        positioner: { alignItems: 'flex-end' },
        content: { '--dialog-base-margin': 'spacing.16', mx: 'auto' },
      },
    },
    scrollBehavior: {
      inside: {
        positioner: { overflow: 'hidden' },
        content: { maxH: 'calc(100% - 7.5rem)' },
        body: { overflow: 'auto' },
      },
      outside: { positioner: { overflow: 'auto', pointerEvents: 'auto' } },
    },
  },
})
