import { definePattern } from '@pandacss/dev'

export const stack = definePattern({
  jsx: ['Stack'],
  properties: {
    align: { type: 'property', value: 'alignItems' },
    justify: { type: 'property', value: 'justifyContent' },
    direction: { type: 'property', value: 'flexDirection' },
    gap: { type: 'property', value: 'gap' },
    wrap: { type: 'property', value: 'flexWrap' },
  },
  transform(props, { map, isCssUnit, isCssVar, isCssFunction }) {
    const { direction, align, justify, wrap, gap, ...rest } = props
    return {
      display: 'flex',
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      '--stack-gap': map(gap, (value) =>
        isCssUnit(value) || isCssVar(value) || isCssFunction(value)
          ? value
          : `token(spacing.${value}, ${value})`,
      ),
      gap: 'var(--stack-gap)',
      '&[data-stack-separated]': { gap: '0' },
      '& > [data-stack-separator]': {
        alignSelf: 'stretch',
        flexShrink: '0',
        marginBlock: map(direction, (value) =>
          value.startsWith('column') ? 'var(--stack-gap)' : '0',
        ),
        marginInline: map(direction, (value) =>
          value.startsWith('row') ? 'var(--stack-gap)' : '0',
        ),
        borderTopWidth: map(direction, (value) =>
          value.startsWith('column') ? 'var(--separator-thickness, 1px)' : '0',
        ),
        borderInlineStartWidth: map(direction, (value) =>
          value.startsWith('row') ? 'var(--separator-thickness, 1px)' : '0',
        ),
      },
      ...rest,
    }
  },
})
