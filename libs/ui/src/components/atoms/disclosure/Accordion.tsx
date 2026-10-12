'use client'
import { Accordion } from '@ark-ui/react/accordion'
import { ark } from '@ark-ui/react/factory'
import { ChevronDownIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { accordion, type AccordionVariantProps } from 'styled-system/recipes'

import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(accordion)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Accordion.Root, AccordionVariantProps> = withProvider(
  Accordion.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Accordion.RootProvider, AccordionVariantProps> =
  withProvider(Accordion.RootProvider, 'root')
export const Item = withContext(Accordion.Item, 'item')
export const ItemContent = withContext(Accordion.ItemContent, 'itemContent')
export const ItemIndicator = withContext(Accordion.ItemIndicator, 'itemIndicator', {
  defaultProps: { children: <ChevronDownIcon /> },
})
export const ItemTrigger = withContext(Accordion.ItemTrigger, 'itemTrigger')
export const ItemBody = withContext(ark.div, 'itemBody')

export {
  AccordionContext as Context,
  AccordionItemContext as ItemContext,
} from '@ark-ui/react/accordion'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ItemProps = ComponentProps<typeof Item>
export type ItemContentProps = ComponentProps<typeof ItemContent>
export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>
export type ItemTriggerProps = ComponentProps<typeof ItemTrigger>
export type ItemBodyProps = ComponentProps<typeof ItemBody>

export {
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
  type UseAccordionProps,
  type UseAccordionReturn,
  type AccordionFocusChangeDetails as FocusChangeDetails,
  type AccordionValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/accordion'
