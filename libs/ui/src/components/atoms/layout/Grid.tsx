'use client'
import { ark } from '@ark-ui/react/factory'
import {
  Grid as PandaGrid,
  type GridProps as PandaGridProps,
  GridItem as PandaGridItem,
  type GridItemProps as PandaGridItemProps,
} from 'styled-system/jsx'
import { createLayout } from '@/components/atoms/internal/create-layout'

export type GridProps = PandaGridProps & { asChild?: boolean }
export const Grid = /* @__PURE__ */ createLayout<GridProps, HTMLDivElement>(PandaGrid, ark.div)
export type GridItemProps = PandaGridItemProps & { asChild?: boolean }
export const GridItem = /* @__PURE__ */ createLayout<GridItemProps, HTMLDivElement>(
  PandaGridItem,
  ark.div,
)
