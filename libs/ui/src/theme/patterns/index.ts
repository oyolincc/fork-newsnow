import { definePattern } from '@pandacss/dev'
import { grid } from './grid'
import { stack } from './stack'

export const patterns = {
  grid,
  gridItem: definePattern({
    properties: {
      area: { type: 'property', value: 'gridArea' },
      colSpan: { type: 'property', value: 'gridColumn' },
      rowSpan: { type: 'property', value: 'gridRow' },
      colStart: { type: 'property', value: 'gridColumnStart' },
      colEnd: { type: 'property', value: 'gridColumnEnd' },
      rowStart: { type: 'property', value: 'gridRowStart' },
      rowEnd: { type: 'property', value: 'gridRowEnd' },
    },
    transform(props, { map }) {
      const { area, colSpan, rowSpan, colStart, colEnd, rowStart, rowEnd, ...rest } = props
      const span = (value: string | number) =>
        value === 'auto' ? value : `span ${value}/span ${value}`
      return {
        gridArea: area,
        gridColumn: map(colSpan, span),
        gridRow: map(rowSpan, span),
        gridColumnStart: colStart,
        gridColumnEnd: colEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        ...rest,
      }
    },
  }),
  stack: { jsxName: 'PandaStack', jsx: ['PandaStack'] },
  hstack: { jsxName: 'PandaHStack', jsx: ['PandaHStack'] },
  vstack: { jsxName: 'PandaVStack', jsx: ['PandaVStack'] },
  componentStack: {
    ...stack,
    jsxName: 'Stack',
    defaultValues: { direction: 'column', gap: '8px' },
  },
  componentHstack: {
    ...stack,
    jsxName: 'HStack',
    jsx: ['HStack'],
    defaultValues: { direction: 'row', align: 'center', gap: '8px' },
  },
  componentVstack: {
    ...stack,
    jsxName: 'VStack',
    jsx: ['VStack'],
    defaultValues: { direction: 'column', align: 'center', gap: '8px' },
  },
  linkBox: definePattern({
    transform: (props) => ({
      position: 'relative',
      '& a[href]:not([data-link-overlay]), & abbr[title]': { position: 'relative', zIndex: '1' },
      ...props,
    }),
  }),
}
