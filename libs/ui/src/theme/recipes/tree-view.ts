import { treeViewAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe, defineStyles } from '@pandacss/dev'

const itemStyle = defineStyles({
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  position: 'relative',
  '--tree-depth': 'calc(var(--depth) - 1)',
})
const subtle = defineStyles({
  _selected: { bg: 'colorPalette.bg.subtle', color: 'colorPalette.fg.default' },
})
const solid = defineStyles({
  _selected: { bg: 'colorPalette.bg.default', color: 'colorPalette.fg.onSolid' },
})

const sizeStyles = {
  branchControl: {
    gap: 'var(--tree-item-gap)',
    '--tree-indentation-offset': 'calc(var(--tree-indentation) * var(--tree-depth))',
    '--tree-offset': 'calc(var(--tree-padding-inline) + var(--tree-indentation-offset))',
    ps: 'var(--tree-offset)',
    pe: 'var(--tree-padding-inline)',
    py: 'var(--tree-padding-block)',
  },
  item: {
    gap: 'var(--tree-item-gap)',
    '--tree-indentation-offset': 'calc(var(--tree-indentation) * var(--tree-depth))',
    '--tree-offset': 'calc(var(--tree-padding-inline) + var(--tree-indentation-offset))',
    ps: 'var(--tree-offset)',
    pe: 'var(--tree-padding-inline)',
    py: 'var(--tree-padding-block)',
  },
  root: { gap: '2' },
  tree: {
    '--tree-item-gap': '{spacing.2}',
    '--tree-indentation': 'calc(var(--tree-indent-size) + var(--tree-icon-size) * 0.5)',
    _icon: { boxSize: 'var(--tree-icon-size)', flexShrink: '0' },
  },
  label: { textStyle: 'sm' },
  branchIndentGuide: {
    '--tree-offset':
      'calc(var(--tree-padding-inline) + var(--tree-indentation) * var(--tree-depth))',
    insetInlineStart: 'calc(var(--tree-offset) + var(--tree-icon-size) * 0.5)',
  },
  nodeCheckbox: { boxSize: 'var(--tree-icon-size)' },
} as const

const appearance = {
  branchControl: {
    borderRadius: 'sm',
    outline: '0',
    cursor: 'pointer',
    focusVisibleRing: 'inside',
    focusRingColor: 'colorPalette.ring',
    _hover: { bg: 'gray.bg.subtle' },
    _disabled: { layerStyle: 'disabled', cursor: 'not-allowed' },
  },
  item: {
    borderRadius: 'sm',
    outline: '0',
    cursor: 'pointer',
    focusVisibleRing: 'inside',
    focusRingColor: 'colorPalette.ring',
    _hover: { bg: 'gray.bg.subtle' },
    _disabled: { layerStyle: 'disabled', cursor: 'not-allowed' },
  },
  root: { color: 'gray.fg.default' },
  label: { fontWeight: 'medium' },
  branchIndentGuide: { bg: 'gray.border.strong' },
  branchTrigger: { outline: '0', focusVisibleRing: 'inside' },
  nodeCheckbox: {
    borderWidth: '1px',
    borderColor: 'gray.border.strong',
    borderRadius: 'xs',
    color: 'gray.fg.default',
    bg: 'gray.bg.page',
    cursor: 'pointer',
    _disabled: { layerStyle: 'disabled', cursor: 'not-allowed' },
    '&[data-state=checked], &[data-state=indeterminate]': {
      bg: 'colorPalette.bg.default',
      color: 'colorPalette.fg.onSolid',
      borderColor: 'colorPalette.bg.default',
    },
  },
  nodeRenameInput: {
    bg: 'gray.bg.page',
    color: 'gray.fg.default',
    borderWidth: '1px',
    borderColor: 'colorPalette.bg.default',
    outline: '0',
    focusVisibleRing: 'inside',
  },
} as const

export const treeView = defineSlotRecipe({
  className: 'app-tree-view',
  jsx: ['TreeView.Root', 'TreeView.RootProvider'],
  slots: treeViewAnatomy.keys(),
  base: {
    root: { width: 'full', display: 'flex', flexDirection: 'column' },
    tree: { display: 'flex', flexDirection: 'column', outline: '0' },
    branch: { position: 'relative' },
    branchContent: { position: 'relative' },
    branchIndentGuide: {
      height: 'full',
      width: '1px',
      position: 'absolute',
      pointerEvents: 'none',
      '--tree-depth': 'calc(var(--depth) - 1)',
    },
    branchIndicator: {
      color: 'inherit',
      display: 'inline-flex',
      transformOrigin: 'center',
      transition: 'transform 0.2s',
      _open: { transform: 'rotate(90deg)' },
      '&[dir=rtl]': { transform: 'rotate(180deg)', _open: { transform: 'rotate(90deg)' } },
    },
    branchTrigger: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
    branchControl: itemStyle,
    item: itemStyle,
    itemText: { flex: '1', minWidth: '0' },
    branchText: { flex: '1', minWidth: '0' },
    itemIndicator: { display: 'inline-flex', '&[hidden]': { display: 'none' } },
    nodeCheckbox: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
    },
    nodeRenameInput: { minWidth: '0' },
  },
  variants: {
    size: {
      md: {
        ...sizeStyles,
        tree: {
          ...sizeStyles.tree,
          textStyle: 'sm',
          '--tree-indent-size': '{spacing.4}',
          '--tree-icon-size': '{spacing.4}',
          '--tree-padding-inline': '{spacing.3}',
          '--tree-padding-block': '{spacing.1.5}',
        },
      },
      sm: {
        ...sizeStyles,
        tree: {
          ...sizeStyles.tree,
          textStyle: 'sm',
          '--tree-indent-size': '{spacing.4}',
          '--tree-icon-size': '{spacing.3}',
          '--tree-padding-inline': '{spacing.3}',
          '--tree-padding-block': '{spacing.1}',
        },
      },
      xs: {
        ...sizeStyles,
        tree: {
          ...sizeStyles.tree,
          textStyle: 'xs',
          '--tree-indent-size': '{spacing.4}',
          '--tree-icon-size': '{spacing.3}',
          '--tree-padding-inline': '{spacing.2}',
          '--tree-padding-block': '{spacing.1}',
        },
      },
      unstyled: {},
    },
    variant: {
      subtle: {
        ...appearance,
        branchControl: { ...appearance.branchControl, ...subtle },
        item: { ...appearance.item, ...subtle },
      },
      solid: {
        ...appearance,
        branchControl: { ...appearance.branchControl, ...solid },
        item: { ...appearance.item, ...solid },
        nodeCheckbox: {
          ...appearance.nodeCheckbox,
          '[data-selected] &': { borderColor: 'colorPalette.fg.onSolid' },
        },
      },
      unstyled: {},
    },
    animateContent: {
      true: {
        branchContent: {
          overflow: 'hidden',
          _open: { animationName: 'expand-height, fade-in', animationDuration: 'normal' },
          _closed: { animationName: 'collapse-height, fade-out', animationDuration: 'normal' },
        },
      },
    },
  },
  defaultVariants: { size: 'md', variant: 'subtle' },
})
