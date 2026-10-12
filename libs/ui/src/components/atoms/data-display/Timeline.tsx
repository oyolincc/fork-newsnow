'use client'
import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { timeline, type TimelineVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext, PropsProvider } = createSlotRecipeContext(timeline)

export { PropsProvider }
export const Root: StyledComponent<typeof ark.div, TimelineVariantProps> = withProvider(
  ark.div,
  'root',
  { defaultProps: { role: 'list' } },
)
export const Item = withContext(ark.div, 'item', { defaultProps: { role: 'listitem' } })
export const Connector = withContext(ark.div, 'connector')
export const Separator = withContext(ark.div, 'separator', {
  defaultProps: { 'aria-hidden': true },
})
export const Indicator = withContext(ark.div, 'indicator')
export const Content = withContext(ark.div, 'content')
export const Title = withContext(ark.div, 'title')
export const Description = withContext(ark.div, 'description')

export type RootProps = ComponentProps<typeof Root>
export type ItemProps = ComponentProps<typeof Item>
export type ConnectorProps = ComponentProps<typeof Connector>
export type SeparatorProps = ComponentProps<typeof Separator>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type ContentProps = ComponentProps<typeof Content>
export type TitleProps = ComponentProps<typeof Title>
export type DescriptionProps = ComponentProps<typeof Description>
