'use client'
import { Collapsible } from '@ark-ui/react/collapsible'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { collapsible } from 'styled-system/recipes'

import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(collapsible)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Collapsible.Root> = withProvider(Collapsible.Root, 'root')
export const RootProvider: StyledComponent<typeof Collapsible.RootProvider> = withProvider(
  Collapsible.RootProvider,
  'root',
)
export const Content = withContext(Collapsible.Content, 'content')
export const Indicator = withContext(Collapsible.Indicator, 'indicator')
export const Trigger = withContext(Collapsible.Trigger, 'trigger')

export { CollapsibleContext as Context } from '@ark-ui/react/collapsible'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ContentProps = ComponentProps<typeof Content>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type TriggerProps = ComponentProps<typeof Trigger>

export {
  useCollapsible,
  useCollapsibleContext,
  type UseCollapsibleProps,
  type UseCollapsibleReturn,
  type CollapsibleOpenChangeDetails as OpenChangeDetails,
} from '@ark-ui/react/collapsible'
