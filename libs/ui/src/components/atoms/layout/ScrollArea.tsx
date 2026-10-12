'use client'
import { ScrollArea } from '@ark-ui/react/scroll-area'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { scrollArea, type ScrollAreaVariantProps } from 'styled-system/recipes'

import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(scrollArea)

export type RootProps = ComponentProps<typeof Root>
export type ContentProps = ComponentProps<typeof Content>

export const Root: StyledComponent<typeof ScrollArea.Root, ScrollAreaVariantProps> = withProvider(
  ScrollArea.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof ScrollArea.RootProvider, ScrollAreaVariantProps> =
  withProvider(ScrollArea.RootProvider, 'root')
export const Content = withContext(ScrollArea.Content, 'content')
export const Corner = withContext(ScrollArea.Corner, 'corner')
export const Thumb = withContext(ScrollArea.Thumb, 'thumb')
export const Scrollbar = withContext(ScrollArea.Scrollbar, 'scrollbar', {
  defaultProps: { children: <Thumb /> },
})
export const Viewport = withContext(ScrollArea.Viewport, 'viewport')

export { ScrollAreaContext as Context } from '@ark-ui/react/scroll-area'

export {
  useScrollArea,
  useScrollAreaContext,
  type UseScrollAreaProps,
  type UseScrollAreaReturn,
} from '@ark-ui/react/scroll-area'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type CornerProps = ComponentProps<typeof Corner>
export type ThumbProps = ComponentProps<typeof Thumb>
export type ScrollbarProps = ComponentProps<typeof Scrollbar>
export type ViewportProps = ComponentProps<typeof Viewport>

export {
  type ScrollAreaScrollToDetails as ScrollToDetails,
  type ScrollAreaScrollToEdgeDetails as ScrollToEdgeDetails,
} from '@ark-ui/react/scroll-area'
