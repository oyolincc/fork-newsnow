'use client'
import { ark } from '@ark-ui/react/factory'
import { forwardRef, type ComponentProps } from 'react'
import { createSlotRecipeContext, styled } from 'styled-system/jsx'
import { table, type TableVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(table)

const StyledRoot: StyledComponent<typeof ark.table, TableVariantProps> = withProvider(
  ark.table,
  'root',
)
export interface RootProps extends ComponentProps<typeof StyledRoot> {
  native?: boolean
}
export const Root = forwardRef<HTMLTableElement, RootProps>(function Root(
  { native, ...props },
  ref,
) {
  return <StyledRoot {...props} data-native={native ? '' : undefined} ref={ref} />
})
export const Body = withContext(ark.tbody, 'body')
export const Caption = withContext(ark.caption, 'caption')
export const Cell = withContext(ark.td, 'cell')
export const Footer = withContext(ark.tfoot, 'foot')
export const Header = withContext(ark.thead, 'head')
export const ColumnHeader = withContext(ark.th, 'header', { defaultProps: { scope: 'col' } })
export const Row = withContext(ark.tr, 'row')
export const ColumnGroup = styled(ark.colgroup)
export const Column = styled(ark.col)
export const ScrollArea = styled(ark.div, {
  base: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'auto',
    maxWidth: 'full',
    WebkitOverflowScrolling: 'touch',
  },
})

export type BodyProps = ComponentProps<typeof Body>
export type CaptionProps = ComponentProps<typeof Caption>
export type CellProps = ComponentProps<typeof Cell>
export type FooterProps = ComponentProps<typeof Footer>
export type HeaderProps = ComponentProps<typeof Header>
export type ColumnHeaderProps = ComponentProps<typeof ColumnHeader>
export type RowProps = ComponentProps<typeof Row>
export type ColumnGroupProps = ComponentProps<typeof ColumnGroup>
export type ColumnProps = ComponentProps<typeof Column>
export type ScrollAreaProps = ComponentProps<typeof ScrollArea>
