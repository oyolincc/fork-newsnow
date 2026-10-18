import { Button, FileUpload } from '@newsnow/ui'
import { css } from 'styled-system/css'
import { useId } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
const fileErrors: Record<string, string> = {
  TOO_MANY_FILES: '最多选择 3 个文件',
  FILE_INVALID_TYPE: '仅支持 PNG、JPEG 和 TXT 文件',
  FILE_TOO_LARGE: '单个文件不能超过 5 MiB',
  FILE_TOO_SMALL: '文件过小',
  FILE_INVALID: '文件无效',
  FILE_EXISTS: '该文件已在列表中',
}
const meta = {
  title: 'Forms/FileUpload',
  component: FileUpload.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '本地文件选择、拖放、预览、移除与拒绝原因。' },
    },
  },
} satisfies Meta<typeof FileUpload.Root>
export default meta
type Story = StoryObj<typeof meta>
export const LocalFiles: Story = {
  render: function LocalFiles() {
    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>文件仅保留在当前页面内存中。选择、拖放、预览和移除均不发起上传请求。</p>
        <FileUpload.Root
          accept={['image/png', 'image/jpeg', 'text/plain']}
          maxFiles={3}
          maxFileSize={5 * 1024 * 1024}
          locale="zh-CN"
          translations={{
            dropzone: '拖放文件或点击选择文件',
            deleteFile: (file) => `移除 ${file.name}`,
            itemPreview: (file) => `${file.name} 的预览`,
          }}
          maxWidth="xl">
          <FileUpload.HiddenInput />
          <FileUpload.Label>本地附件</FileUpload.Label>
          <FileUpload.Dropzone aria-describedby={`${storyId}-file-upload-help`} gap="3">
            <p>拖放文件到这里，或点击选择</p>
            <p id={`${storyId}-file-upload-help`}>PNG、JPEG、TXT；最多 3 个，每个不超过 5 MiB。</p>
          </FileUpload.Dropzone>
          <div className={css({ display: 'flex', gap: '3', flexWrap: 'wrap' })}>
            <FileUpload.Trigger asChild>
              <Button type="button">选择文件</Button>
            </FileUpload.Trigger>
            <FileUpload.ClearTrigger asChild>
              <Button type="button" variant="outline">
                清空列表
              </Button>
            </FileUpload.ClearTrigger>
          </div>
          <FileUpload.Context>
            {({ acceptedFiles, rejectedFiles }) => (
              <>
                <p role="status">已选择 {acceptedFiles.length} 个文件</p>
                <FileUpload.ItemGroup>
                  {acceptedFiles.map((file, index) => (
                    <FileUpload.Item file={file} key={`${file.name}-${file.lastModified}-${index}`}>
                      <FileUpload.ItemPreview type="image">
                        <FileUpload.ItemPreviewImage />
                      </FileUpload.ItemPreview>
                      <FileUpload.ItemPreview type="application" />
                      <FileUpload.ItemPreview type="text" />
                      <div className={css({ display: 'grid', gap: '1', flex: '1', minWidth: '0' })}>
                        <FileUpload.ItemName overflowWrap="anywhere" />
                        <FileUpload.ItemSizeText />
                      </div>
                      <FileUpload.ItemDeleteTrigger />
                    </FileUpload.Item>
                  ))}
                </FileUpload.ItemGroup>
                {rejectedFiles.length > 0 && (
                  <ul role="alert" className={css({ color: 'error' })}>
                    {rejectedFiles.map(({ file, errors }, index) => (
                      <li key={`${file.name}-${index}`}>
                        {file.name}：
                        {errors.map((error) => fileErrors[error] || '文件不符合要求').join('；')}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </FileUpload.Context>
        </FileUpload.Root>
      </div>
    )
  },
}
export const Disabled: Story = {
  render: function Disabled() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <FileUpload.Root disabled maxWidth="xl">
          <FileUpload.HiddenInput />
          <FileUpload.Label>禁用的文件选择</FileUpload.Label>
          <FileUpload.Trigger asChild>
            <Button type="button" variant="outline">
              不可选择文件
            </Button>
          </FileUpload.Trigger>
          <FileUpload.List />
        </FileUpload.Root>
      </div>
    )
  },
}
