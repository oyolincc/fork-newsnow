import { Button, Editable } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/Editable',
  component: Editable.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '编辑、提交、取消与外部 store。' },
    },
  },
} satisfies Meta<typeof Editable.Root>
export default meta
type Story = StoryObj<typeof meta>
export const CommitAndCancel: Story = {
  render: function CommitAndCancel() {
    const [title, setTitle] = useState('可编辑的标题')
    const [savedTitle, setSavedTitle] = useState(title)

    const editable = Editable.useEditable({
      value: title,
      onValueChange: ({ value }) => setTitle(value),
      onValueCommit: ({ value }) => setSavedTitle(value),
      activationMode: 'none',
      submitMode: 'enter',
    })
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3', maxWidth: 'xl' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>提交与取消编辑</h3>
          <Editable.RootProvider value={editable} size="md">
            <Editable.Label className={css({ srOnly: true })}>标题</Editable.Label>
            <Editable.Area>
              <Editable.Input />
              <Editable.Preview />
            </Editable.Area>
            <Editable.Control>
              <Editable.Context>
                {(context) =>
                  context.editing ? (
                    <>
                      <Editable.SubmitTrigger asChild>
                        <Button size="sm">保存</Button>
                      </Editable.SubmitTrigger>
                      <Editable.CancelTrigger asChild>
                        <Button size="sm" variant="outline">
                          取消
                        </Button>
                      </Editable.CancelTrigger>
                    </>
                  ) : (
                    <Editable.EditTrigger asChild>
                      <Button size="sm" variant="outline">
                        编辑
                      </Button>
                    </Editable.EditTrigger>
                  )
                }
              </Editable.Context>
            </Editable.Control>
          </Editable.RootProvider>
          <p role="status">最后提交：{savedTitle}；Enter 保存，Escape 取消。</p>
          <Editable.Root defaultValue="只读文本" readOnly size="sm">
            <Editable.Label className={css({ srOnly: true })}>只读标题</Editable.Label>
            <Editable.Area>
              <Editable.Input />
              <Editable.Preview />
            </Editable.Area>
          </Editable.Root>
        </div>
      </div>
    )
  },
}
export const CustomSize: Story = {
  render: function CustomSize() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Editable.Root size="unstyled" defaultValue="点击编辑标题" gap="2">
          <Editable.Label className={css({ srOnly: true })}>自定尺寸的标题</Editable.Label>
          <Editable.Area>
            <Editable.Preview minHeight="36px" px="2" textStyle="sm" />
            <Editable.Input minHeight="36px" px="2" textStyle="sm" />
          </Editable.Area>
        </Editable.Root>
      </div>
    )
  },
}
