'use client'
import { ark } from '@ark-ui/react/factory'
import { XIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { tag, type TagVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(tag)

export const Root: StyledComponent<typeof ark.div, TagVariantProps> = withProvider(ark.div, 'root')
export const Label = withContext(ark.span, 'label')
export const StartElement = withContext(ark.span, 'startElement')
export const EndElement = withContext(ark.span, 'endElement')
export const CloseTrigger = withContext(ark.button, 'closeTrigger', {
  defaultProps: { type: 'button', 'aria-label': 'Remove tag', children: <XIcon /> },
})

export type RootProps = ComponentProps<typeof Root>
export type LabelProps = ComponentProps<typeof Label>
export type StartElementProps = ComponentProps<typeof StartElement>
export type EndElementProps = ComponentProps<typeof EndElement>
export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>
