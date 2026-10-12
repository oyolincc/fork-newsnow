'use client'
import { Tabs } from '@ark-ui/react/tabs'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { tabs, type TabsVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(tabs)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Tabs.Root, TabsVariantProps> = withProvider(
  Tabs.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Tabs.RootProvider, TabsVariantProps> =
  withProvider(Tabs.RootProvider, 'root')
export const List = withContext(Tabs.List, 'list')
export const Trigger = withContext(Tabs.Trigger, 'trigger')
export const Content = withContext(Tabs.Content, 'content')
export const Indicator = withContext(Tabs.Indicator, 'indicator')

export { TabsContext as Context } from '@ark-ui/react/tabs'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ListProps = ComponentProps<typeof List>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ContentProps = ComponentProps<typeof Content>
export type IndicatorProps = ComponentProps<typeof Indicator>

export {
  useTabs,
  useTabsContext,
  type UseTabsProps,
  type UseTabsReturn,
  type TabsFocusChangeDetails as FocusChangeDetails,
  type TabsValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/tabs'
