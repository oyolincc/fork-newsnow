import { avatarAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  root: {
    width: 'var(--avatar-size)',
    height: 'var(--avatar-size)',
    fontSize: 'var(--avatar-font-size)',
  },
  fallback: { fontSize: 'var(--avatar-font-size)', lineHeight: '1' },
} as const

const appearance = { root: { fontWeight: 'medium' }, fallback: { fontWeight: 'medium' } } as const

const shapeStyles = {
  root: { borderRadius: 'var(--avatar-radius)' },
  fallback: { borderRadius: 'var(--avatar-radius)' },
  image: { borderRadius: 'var(--avatar-radius)' },
} as const

export const avatar = defineSlotRecipe({
  className: 'app-avatar',
  jsx: ['Avatar.Root', 'Avatar.RootProvider'],
  slots: avatarAnatomy.keys(),
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      verticalAlign: 'top',
      flexShrink: '0',
      userSelect: 'none',
    },
    fallback: { textTransform: 'uppercase' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
  },
  defaultVariants: { size: 'md', shape: 'full', variant: 'subtle' },
  variants: {
    size: {
      full: {
        ...sizeStyles,
        root: { ...sizeStyles.root, '--avatar-size': '100%', '--avatar-font-size': '100%' },
      },
      '2xs': {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--avatar-font-size': 'fontSizes.2xs',
          '--avatar-size': 'sizes.6',
        },
        fallback: { ...sizeStyles.fallback, _icon: { width: '3', height: '3' } },
      },
      xs: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--avatar-font-size': 'fontSizes.xs',
          '--avatar-size': 'sizes.8',
        },
        fallback: { ...sizeStyles.fallback, _icon: { width: '4', height: '4' } },
      },
      sm: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--avatar-font-size': 'fontSizes.sm',
          '--avatar-size': 'sizes.9',
        },
        fallback: { ...sizeStyles.fallback, _icon: { width: '4.5', height: '4.5' } },
      },
      md: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--avatar-font-size': 'fontSizes.md',
          '--avatar-size': 'sizes.10',
        },
        fallback: { ...sizeStyles.fallback, _icon: { width: '5', height: '5' } },
      },
      lg: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--avatar-font-size': 'fontSizes.md',
          '--avatar-size': 'sizes.11',
        },
        fallback: { ...sizeStyles.fallback, _icon: { width: '5.5', height: '5.5' } },
      },
      xl: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--avatar-font-size': 'fontSizes.lg',
          '--avatar-size': 'sizes.12',
        },
        fallback: { ...sizeStyles.fallback, _icon: { width: '6', height: '6' } },
      },
      '2xl': {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--avatar-font-size': 'fontSizes.xl',
          '--avatar-size': 'sizes.16',
        },
        fallback: { ...sizeStyles.fallback, _icon: { width: '8', height: '8' } },
      },
      unstyled: {},
    },
    variant: {
      solid: {
        ...appearance,
        root: {
          ...appearance.root,
          bg: 'colorPalette.bg.default',
          color: 'colorPalette.fg.onSolid',
        },
      },
      surface: {
        ...appearance,
        root: {
          ...appearance.root,
          bg: 'colorPalette.bg.surface',
          borderWidth: '1px',
          borderColor: 'colorPalette.border.default',
          color: 'colorPalette.fg.default',
        },
      },
      subtle: {
        ...appearance,
        root: {
          ...appearance.root,
          bg: 'colorPalette.bg.subtle',
          color: 'colorPalette.fg.default',
        },
      },
      outline: {
        ...appearance,
        root: {
          ...appearance.root,
          borderWidth: '1px',
          borderColor: 'colorPalette.border.strong',
          color: 'colorPalette.fg.default',
        },
      },
      unstyled: {},
    },
    shape: {
      square: shapeStyles,
      rounded: { ...shapeStyles, root: { ...shapeStyles.root, '--avatar-radius': 'radii.md' } },
      full: { ...shapeStyles, root: { ...shapeStyles.root, '--avatar-radius': 'radii.full' } },
      unstyled: {},
    },
  },
})
