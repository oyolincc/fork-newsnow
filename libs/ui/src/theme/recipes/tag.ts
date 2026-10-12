import { defineSlotRecipe } from '@pandacss/dev'
import { badge } from './badge'

const sizeStyles = {
  root: { lineHeight: '1' },
  startElement: {
    boxSize: 'var(--tag-element-size)',
    ms: 'var(--tag-element-offset)',
    '&:has([data-scope=avatar])': {
      boxSize: 'var(--tag-avatar-size)',
      ms: 'calc(var(--tag-element-offset) * 1.5)',
    },
  },
  endElement: {
    boxSize: 'var(--tag-element-size)',
    me: 'var(--tag-element-offset)',
    '&:has(button)': { ms: 'calc(var(--tag-element-offset) * -1)' },
  },
} as const

const appearance = {
  root: { focusRing: 'outside' },
  closeTrigger: {
    borderRadius: 'xs',
    cursor: 'pointer',
    focusRing: 'inside',
    _disabled: { cursor: 'not-allowed', opacity: '0.5' },
  },
} as const

export const tag = defineSlotRecipe({
  className: 'tag',
  jsx: ['Tag.Root'],
  slots: ['root', 'label', 'startElement', 'endElement', 'closeTrigger'],
  base: {
    root: { ...badge.base, verticalAlign: 'top', maxWidth: 'full' },
    label: { minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    startElement: { flexShrink: '0', display: 'inline-flex', _icon: { boxSize: 'full' } },
    endElement: { flexShrink: '0', display: 'inline-flex', _icon: { boxSize: 'full' } },
    closeTrigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSize: 'full',
      color: 'currentColor',
      _icon: { boxSize: 'full' },
    },
  },
  variants: {
    variant: {
      subtle: { ...appearance, root: { ...appearance.root, ...badge.variants?.variant.subtle } },
      solid: { ...appearance, root: { ...appearance.root, ...badge.variants?.variant.solid } },
      outline: { ...appearance, root: { ...appearance.root, ...badge.variants?.variant.outline } },
      surface: { ...appearance, root: { ...appearance.root, ...badge.variants?.variant.surface } },
      unstyled: {},
    },
    size: {
      sm: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          px: '1.5',
          minH: '4.5',
          gap: '1',
          '--tag-element-size': '{spacing.3}',
          '--tag-avatar-size': '{spacing.3}',
          '--tag-element-offset': '-2px',
        },
        label: { textStyle: 'xs' },
      },
      md: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          px: '1.5',
          minH: '5',
          gap: '1',
          '--tag-element-size': '{spacing.3.5}',
          '--tag-avatar-size': '{spacing.3.5}',
          '--tag-element-offset': '-2px',
        },
        label: { textStyle: 'xs' },
      },
      lg: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          px: '2',
          minH: '6',
          gap: '1.5',
          '--tag-element-size': '{spacing.4}',
          '--tag-avatar-size': '{spacing.4.5}',
          '--tag-element-offset': '-3px',
        },
        label: { textStyle: 'sm' },
      },
      xl: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          px: '2.5',
          minH: '8',
          gap: '1.5',
          '--tag-element-size': '{spacing.4.5}',
          '--tag-avatar-size': '{spacing.6}',
          '--tag-element-offset': '-4px',
        },
        label: { textStyle: 'sm' },
      },
      unstyled: {},
    },
  },
  defaultVariants: { size: 'md', variant: 'surface' },
})
