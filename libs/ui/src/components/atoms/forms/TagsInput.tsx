'use client'
import { TagsInput, useTagsInputContext } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { tagsInput, type TagsInputVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(tagsInput)

export type RootProps = ComponentProps<typeof Root>
export type ItemProps = ComponentProps<typeof Item>
export const Root: StyledComponent<typeof TagsInput.Root, TagsInputVariantProps> = withProvider(
  TagsInput.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof TagsInput.RootProvider, TagsInputVariantProps> =
  withProvider(TagsInput.RootProvider, 'root')
export const ClearTrigger = withContext(TagsInput.ClearTrigger, 'clearTrigger', {
  defaultProps: { children: <XIcon /> },
})
export const Control = withContext(TagsInput.Control, 'control')
export const HiddenInput = TagsInput.HiddenInput
export const Input = withContext(TagsInput.Input, 'input')
export const Item = withContext(TagsInput.Item, 'item')
export const ItemDeleteTrigger = withContext(TagsInput.ItemDeleteTrigger, 'itemDeleteTrigger', {
  defaultProps: { children: <XIcon /> },
})
export const ItemInput = withContext(TagsInput.ItemInput, 'itemInput')
export const ItemPreview = withContext(TagsInput.ItemPreview, 'itemPreview')
export const ItemText = withContext(TagsInput.ItemText, 'itemText')
export const Label = withContext(TagsInput.Label, 'label')

export { TagsInputContext as Context } from '@ark-ui/react/tags-input'

export interface TagsInputItemsProps extends Omit<ItemProps, 'value' | 'index'> {}

export const Items = (props: TagsInputItemsProps) => {
  const context = useTagsInputContext()

  return context.value.map((item, index) => (
    <Item key={index} index={index} value={item} {...props}>
      <ItemPreview>
        <ItemText>{item}</ItemText>
        <ItemDeleteTrigger />
      </ItemPreview>
      <ItemInput />
    </Item>
  ))
}

export {
  useTagsInput,
  type UseTagsInputProps,
  type UseTagsInputReturn,
} from '@ark-ui/react/tags-input'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>
export type ControlProps = ComponentProps<typeof Control>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>
export type InputProps = ComponentProps<typeof Input>
export type ItemDeleteTriggerProps = ComponentProps<typeof ItemDeleteTrigger>
export type ItemInputProps = ComponentProps<typeof ItemInput>
export type ItemPreviewProps = ComponentProps<typeof ItemPreview>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type LabelProps = ComponentProps<typeof Label>
export type ItemsProps = ComponentProps<typeof Items>

export {
  useTagsInputContext,
  useTagsInputItemContext,
  type TagsInputHighlightChangeDetails as HighlightChangeDetails,
  type TagsInputInputValueChangeDetails as InputValueChangeDetails,
  type TagsInputValidityChangeDetails as ValidityChangeDetails,
  type TagsInputValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/tags-input'
