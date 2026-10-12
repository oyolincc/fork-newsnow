'use client'
import { ark } from '@ark-ui/react/factory'
import { ChevronRightIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { breadcrumb, type BreadcrumbVariantProps } from 'styled-system/recipes'

import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(breadcrumb)

export type RootProps = ComponentProps<typeof Root>

export const Root: StyledComponent<typeof ark.nav, BreadcrumbVariantProps> = withProvider(
  ark.nav,
  'root',
  { defaultProps: { 'aria-label': 'breadcrumb' } },
)
export const List = withContext(ark.ol, 'list')
export const Item = withContext(ark.li, 'item')
export const Link = withContext(ark.a, 'link')
export const CurrentLink = withContext(ark.span, 'currentLink', {
  defaultProps: { role: 'link', 'aria-current': 'page' },
})
export const Ellipsis = withContext(ark.li, 'ellipsis', {
  defaultProps: {
    role: 'presentation',
    'aria-hidden': true,
    children: '...',
  },
})

export const Separator = withContext(ark.li, 'separator', {
  defaultProps: {
    'aria-hidden': true,
    children: <ChevronRightIcon />,
  },
})

export type ListProps = ComponentProps<typeof List>

export type ItemProps = ComponentProps<typeof Item>

export type LinkProps = ComponentProps<typeof Link>

export type CurrentLinkProps = ComponentProps<typeof CurrentLink>

export type EllipsisProps = ComponentProps<typeof Ellipsis>

export type SeparatorProps = ComponentProps<typeof Separator>
