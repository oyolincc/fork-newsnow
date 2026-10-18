import { defineSlotRecipe } from '@pandacss/dev'
type SlotStyles = NonNullable<Parameters<typeof defineSlotRecipe>[0]['base']>

const sizeStyles = { head: { textStyle: 'xs' }, cell: { textStyle: 'sm' } } as const

const appearance = {
  cell: {
    color: 'gray.fg.muted',
    boxShadow: 'inset 0 -1px 0 0 var(--shadow-color)',
    shadowColor: 'gray.border.subtle',
    _pinned: {
      bg: 'inherit',
      boxShadow: 'inset 0 -1px 0 0 var(--shadow-color)',
      shadowColor: 'gray.border.subtle',
    },
  },
  row: { _last: { '& td': { boxShadow: 'none' } } },
  header: { boxShadow: 'inset 0 -1px 0 0 var(--shadow-color)', shadowColor: 'gray.border.subtle' },
  head: { color: 'gray.fg.muted', fontWeight: 'semibold' },
  caption: { color: 'gray.fg.subtle', fontWeight: 'medium' },
  foot: {
    fontWeight: 'medium',
    '& td': {
      boxShadow: 'inset 0 1px 0 0 var(--shadow-color)!',
      shadowColor: 'gray.border.subtle',
    },
  },
} as const

const definition = {
  className: 'app-table',
  jsx: ['Table.Root'],
  slots: ['root', 'body', 'cell', 'foot', 'head', 'header', 'row', 'caption'],
  base: {
    root: {
      borderCollapse: 'collapse',
      fontVariantNumeric: 'lining-nums tabular-nums',
      textAlign: 'start',
      verticalAlign: 'top',
      width: 'full',
    },
    cell: {
      alignItems: 'center',
      textAlign: 'start',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      _pinned: { overflow: 'unset', position: 'sticky', zIndex: 1 },
    },
    header: {
      textAlign: 'left',
      verticalAlign: 'middle',
      _pinned: { position: 'sticky', bg: 'inherit', zIndex: 2 },
    },
    head: { textAlign: 'start', whiteSpace: 'nowrap' },
    caption: { captionSide: 'bottom' },
  },
  defaultVariants: { size: 'md' as const, variant: 'plain' as const },
  variants: {
    variant: {
      surface: {
        ...appearance,
        header: { ...appearance.header, bg: 'gray.bg.surface.hover' },
        row: { ...appearance.row, bg: 'gray.bg.surface' },
      },
      plain: appearance,
      line: appearance,
      outline: {
        ...appearance,
        root: { borderWidth: '1px', borderColor: 'gray.border.subtle' },
        header: { ...appearance.header, bg: 'gray.bg.surface.hover' },
        row: { ...appearance.row, bg: 'gray.bg.surface' },
      },
      unstyled: {},
    },
    striped: { true: { row: { '&:nth-of-type(odd) td': { bg: 'gray.bg.surface.hover' } } } },
    interactive: { true: { body: { '& tr:hover > td': { bg: 'gray.bg.surface.hover' } } } },
    columnBorder: {
      true: {
        header: { '&:not(:last-of-type)': { borderInlineEndWidth: '1px' } },
        cell: { '&:not(:last-of-type)': { borderInlineEndWidth: '1px' } },
      },
    },
    stickyHeader: {
      true: {
        head: {
          bg: 'gray.bg.page',
          '& :where(tr)': {
            bg: 'inherit',
            top: 'var(--table-sticky-offset, 0)',
            position: 'sticky',
            zIndex: 2,
          },
        },
      },
    },
    size: {
      sm: {
        ...sizeStyles,
        root: { textStyle: 'xs' },
        header: { px: '2', py: '2' },
        cell: { textStyle: 'xs', px: '2', py: '2' },
      },
      lg: {
        ...sizeStyles,
        root: { textStyle: 'md' },
        header: { px: '4', py: '4' },
        cell: { textStyle: 'md', px: '4', py: '4' },
      },
      md: {
        ...sizeStyles,
        root: { textStyle: 'sm' },
        header: { px: '3', py: '3' },
        cell: { ...sizeStyles.cell, px: '3', py: '3' },
      },
      unstyled: {},
    },
  },
} satisfies Parameters<typeof defineSlotRecipe>[0]

const nativeSelectors = {
  body: 'tbody',
  cell: 'td',
  foot: 'tfoot',
  head: 'thead',
  header: 'th',
  row: 'tr',
  caption: 'caption',
} as const

function withNativeStyles<T extends SlotStyles>(styles: T): T {
  const selectors: Record<string, unknown> = {}
  for (const [slot, selector] of Object.entries(nativeSelectors)) {
    if (styles[slot]) selectors[`&[data-native] ${selector}`] = styles[slot]
  }
  return { ...styles, root: { ...styles.root, ...selectors } } as T
}

export const table = defineSlotRecipe({
  ...definition,
  base: withNativeStyles(definition.base),
  variants: Object.fromEntries(
    Object.entries(definition.variants).map(([name, variants]) => [
      name,
      Object.fromEntries(
        Object.entries(variants).map(([value, styles]) => [value, withNativeStyles(styles)]),
      ),
    ]),
  ) as typeof definition.variants,
})
