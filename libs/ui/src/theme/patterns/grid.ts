import { definePattern } from '@pandacss/dev'

export const grid = definePattern({
  properties: {
    templateColumns: { type: 'property', value: 'gridTemplateColumns' },
    templateRows: { type: 'property', value: 'gridTemplateRows' },
    templateAreas: { type: 'property', value: 'gridTemplateAreas' },
    autoFlow: { type: 'property', value: 'gridAutoFlow' },
    autoRows: { type: 'property', value: 'gridAutoRows' },
    autoColumns: { type: 'property', value: 'gridAutoColumns' },
    column: { type: 'property', value: 'gridColumn' },
    row: { type: 'property', value: 'gridRow' },
    inline: { type: 'boolean' },
  },
  transform(props, { map, isCssUnit, isCssVar, isCssFunction }) {
    const {
      templateColumns,
      templateRows,
      templateAreas,
      autoFlow,
      autoRows,
      autoColumns,
      column,
      row,
      inline,
      columns,
      minChildWidth,
      ...rest
    } = props
    const resolvedColumns =
      columns != null
        ? map(columns, (value) => `repeat(${value}, minmax(0, 1fr))`)
        : map(
            minChildWidth,
            (value) =>
              `repeat(auto-fit, minmax(${isCssUnit(value) || isCssVar(value) || isCssFunction(value) ? value : `token(sizes.${value}, ${value})`}, 1fr))`,
          )
    return {
      display: inline == null ? 'grid' : map(inline, (value) => (value ? 'inline-grid' : 'grid')),
      gridTemplateColumns: templateColumns == null ? resolvedColumns : templateColumns,
      gridTemplateRows: templateRows,
      gridTemplateAreas: templateAreas,
      gridAutoFlow: autoFlow,
      gridAutoRows: autoRows,
      gridAutoColumns: autoColumns,
      gridColumn: column,
      gridRow: row,
      ...rest,
    }
  },
})
