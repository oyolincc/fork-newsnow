'use client'
import { FileUpload, useFileUploadContext } from '@ark-ui/react/file-upload'
import { FileIcon, XIcon } from 'lucide-react'
import { type ComponentProps, forwardRef } from 'react'
import {
  createSlotRecipeContext,
  type HTMLStyledProps,
  PandaStack as Stack,
} from 'styled-system/jsx'
import { fileUpload, type FileUploadVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'
import { Span } from '@/components/atoms/internal/Span'

const { withProvider, withContext } = createSlotRecipeContext(fileUpload)

export type RootProps = ComponentProps<typeof Root>
export type ItemProps = ComponentProps<typeof Item>

export const Root: StyledComponent<typeof FileUpload.Root, FileUploadVariantProps> = withProvider(
  FileUpload.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof FileUpload.RootProvider, FileUploadVariantProps> =
  withProvider(FileUpload.RootProvider, 'root')
export const ClearTrigger = withContext(FileUpload.ClearTrigger, 'clearTrigger')
export const Dropzone = withContext(FileUpload.Dropzone, 'dropzone')
export const HiddenInput = FileUpload.HiddenInput
export const Item = withContext(FileUpload.Item, 'item')
export const ItemDeleteTrigger = withContext(FileUpload.ItemDeleteTrigger, 'itemDeleteTrigger', {
  defaultProps: { children: <XIcon /> },
})
export const ItemGroup = withContext(FileUpload.ItemGroup, 'itemGroup')
export const ItemName = withContext(FileUpload.ItemName, 'itemName')
export const ItemPreview = withContext(FileUpload.ItemPreview, 'itemPreview', {
  defaultProps: {
    children: <FileIcon />,
  },
})
export const ItemPreviewImage = withContext(FileUpload.ItemPreviewImage, 'itemPreviewImage')
export const ItemSizeText = withContext(FileUpload.ItemSizeText, 'itemSizeText')
export const Label = withContext(FileUpload.Label, 'label')
export const Trigger = withContext(FileUpload.Trigger, 'trigger')

export { FileUploadContext as Context } from '@ark-ui/react/file-upload'

interface ItemsBaseProps {
  showSize?: boolean | undefined
  clearable?: boolean | undefined
  files?: File[] | undefined
}

export interface ItemsProps extends Omit<ItemProps, 'file'>, ItemsBaseProps {}

export const Items = (props: ItemsProps) => {
  const { showSize = true, clearable = true, files, ...rest } = props
  const fileUpload = useFileUploadContext()
  const acceptedFiles = files || fileUpload.acceptedFiles

  return acceptedFiles.map((file, index) => (
    <Item file={file} key={`${file.name}-${file.size}-${file.lastModified}-${index}`} {...rest}>
      <ItemPreview />
      <Stack gap="0.5" flex="1">
        <ItemName />
        {showSize && <ItemSizeText />}
      </Stack>

      {clearable && <ItemDeleteTrigger />}
    </Item>
  ))
}

export interface ListProps extends ComponentProps<typeof ItemGroup>, ItemsBaseProps {}

export const List = forwardRef<HTMLUListElement, ListProps>(function FileUploadList(props, ref) {
  const { showSize = true, clearable = true, files, ...rest } = props

  return (
    <ItemGroup ref={ref} {...rest}>
      <Items showSize={showSize} clearable={clearable} files={files} />
    </ItemGroup>
  )
})

export interface FileTextProps extends HTMLStyledProps<'span'> {
  fallback?: string | undefined
}

export const FileText = forwardRef<HTMLSpanElement, FileTextProps>(
  function FileUploadFileText(props, ref) {
    const { fallback = 'Select file(s)', ...rest } = props

    const fileUpload = useFileUploadContext()

    const acceptedFiles = fileUpload.acceptedFiles

    const fileText =
      acceptedFiles.length === 1
        ? acceptedFiles[0].name
        : acceptedFiles.length > 1
          ? `${acceptedFiles.length} files`
          : fallback

    return (
      <Span
        ref={ref}
        data-placeholder={acceptedFiles.length === 0 ? '' : undefined}
        data-scope="file-upload"
        data-part="file-text"
        {...rest}>
        {fileText}
      </Span>
    )
  },
)

export {
  useFileUpload,
  useFileUploadContext,
  type UseFileUploadProps,
  type UseFileUploadReturn,
  type FileUploadFileChangeDetails,
  type FileUploadFileRejectDetails,
} from '@ark-ui/react/file-upload'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>
export type DropzoneProps = ComponentProps<typeof Dropzone>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>
export type ItemDeleteTriggerProps = ComponentProps<typeof ItemDeleteTrigger>
export type ItemGroupProps = ComponentProps<typeof ItemGroup>
export type ItemNameProps = ComponentProps<typeof ItemName>
export type ItemPreviewProps = ComponentProps<typeof ItemPreview>
export type ItemPreviewImageProps = ComponentProps<typeof ItemPreviewImage>
export type ItemSizeTextProps = ComponentProps<typeof ItemSizeText>
export type LabelProps = ComponentProps<typeof Label>
export type TriggerProps = ComponentProps<typeof Trigger>

export {
  type FileUploadFileAcceptDetails as FileAcceptDetails,
  type FileUploadFileChangeDetails as FileChangeDetails,
  type FileUploadFileRejectDetails as FileRejectDetails,
  type FileUploadFileValidateDetails as FileValidateDetails,
} from '@ark-ui/react/file-upload'
