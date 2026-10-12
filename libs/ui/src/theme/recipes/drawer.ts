import { dialogAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  title: { textStyle: 'xl' },
  description: { textStyle: 'sm' },
  closeTrigger: { top: '3', insetEnd: '3' },
  header: { gap: '1', pt: { base: '4', md: '6' }, pb: '4', px: { base: '4', md: '6' } },
  body: { p: { base: '4', md: '6' } },
  footer: { gap: '3', py: '4', px: { base: '4', md: '6' } },
} as const

export const drawer = defineSlotRecipe({
  className: 'drawer',
  jsx: ['Drawer.Root', 'Drawer.RootProvider'],
  slots: dialogAnatomy.extendWith('header', 'body', 'footer').keys(),
  base: {
    backdrop: {
      background: 'black.a7',
      position: 'fixed',
      insetInlineStart: '0',
      top: '0',
      width: '100vw',
      height: '100dvh',
      zIndex: 'overlay',
      _open: {
        _motionSafe: {
          animationName: 'fade-in',
          animationTimingFunction: 'out',
          animationDuration: 'slow',
        },
      },
      _closed: {
        _motionSafe: {
          animationName: 'fade-out',
          animationTimingFunction: 'in',
          animationDuration: 'normal',
        },
      },
      _motionReduce: { animation: 'none' },
    },
    positioner: {
      display: 'flex',
      width: '100vw',
      height: '100dvh',
      position: 'fixed',
      insetInlineStart: '0',
      top: '0',
      zIndex: 'modal',
      overscrollBehaviorY: 'none',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      outline: 0,
      zIndex: 'modal',
      maxH: '100dvh',
      color: 'inherit',
      bg: 'gray.bg.surface',
      boxShadow: 'lg',
      _open: {
        _motionSafe: {
          animationDuration: 'slowest',
          animationTimingFunction: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
        },
      },
      _closed: {
        _motionSafe: {
          animationDuration: 'normal',
          animationTimingFunction: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',
        },
      },
      _motionReduce: { animation: 'none' },
    },
    header: { display: 'flex', flexDirection: 'column', flex: '0' },
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      flex: '1',
      overflow: 'auto',
    },
    footer: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '0' },
    title: { color: 'gray.fg.default', fontWeight: 'semibold' },
    description: { color: 'gray.fg.muted' },
    closeTrigger: { pos: 'absolute' },
  },
  defaultVariants: { placement: 'end', size: 'sm' },
  variants: {
    size: {
      xs: { ...sizeStyles, content: { maxW: 'xs' } },
      sm: { ...sizeStyles, content: { maxW: 'sm' } },
      md: { ...sizeStyles, content: { maxW: 'md' } },
      lg: { ...sizeStyles, content: { maxW: 'lg' } },
      xl: { ...sizeStyles, content: { maxW: 'xl' } },
      full: { ...sizeStyles, content: { maxW: '100vw', h: '100dvh' } },
      unstyled: {},
    },
    placement: {
      start: {
        positioner: { justifyContent: 'flex-start', alignItems: 'stretch' },
        content: {
          _open: {
            _motionSafe: {
              animationName: {
                base: 'slide-from-left-full, fade-in',
                _rtl: 'slide-from-right-full, fade-in',
              },
            },
          },
          _closed: {
            _motionSafe: {
              animationName: {
                base: 'slide-to-left-full, fade-out',
                _rtl: 'slide-to-right-full, fade-out',
              },
            },
          },
        },
      },
      end: {
        positioner: { justifyContent: 'flex-end', alignItems: 'stretch' },
        content: {
          _open: {
            _motionSafe: {
              animationName: {
                base: 'slide-from-right-full, fade-in',
                _rtl: 'slide-from-left-full, fade-in',
              },
            },
          },
          _closed: {
            _motionSafe: {
              animationName: {
                base: 'slide-to-right-full, fade-out',
                _rtl: 'slide-to-left-full, fade-out',
              },
            },
          },
        },
      },
      top: {
        positioner: { justifyContent: 'stretch', alignItems: 'flex-start' },
        content: {
          maxW: '100%',
          _open: {
            _motionSafe: { animationName: 'slide-from-top-full, fade-in' },
          },
          _closed: {
            _motionSafe: { animationName: 'slide-to-top-full, fade-out' },
          },
        },
      },
      bottom: {
        positioner: { justifyContent: 'stretch', alignItems: 'flex-end' },
        content: {
          maxW: '100%',
          _open: {
            _motionSafe: { animationName: 'slide-from-bottom-full, fade-in' },
          },
          _closed: {
            _motionSafe: { animationName: 'slide-to-bottom-full, fade-out' },
          },
        },
      },
    },
  },
})
