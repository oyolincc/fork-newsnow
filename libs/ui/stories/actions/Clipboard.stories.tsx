import { Button, Clipboard, Input, useClipboard } from '@newsnow/ui'
import { useState } from 'react'
import { hstack } from 'styled-system/patterns'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Actions/Clipboard',
  component: Clipboard.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '复制状态、自定义图标和外部 store。' },
    },
  },
} satisfies Meta<typeof Clipboard.Root>
export default meta
type Story = StoryObj<typeof meta>
export const CopyAndStatus: Story = {
  render: function CopyAndStatus() {
    const [copied, setCopied] = useState(false)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Clipboard.Root value="@newsnow/ui" onStatusChange={(details) => setCopied(details.copied)}>
          <Clipboard.Label>复制包名</Clipboard.Label>
          <Clipboard.Control className={hstack({ gap: '3', width: 'full' })}>
            <Clipboard.Input asChild>
              <Input readOnly aria-label="待复制包名" maxWidth="sm" />
            </Clipboard.Input>
            <Clipboard.Trigger asChild>
              <Button type="button" variant="outline">
                <Clipboard.Indicator />
                <Clipboard.CopyText copied="已复制">复制</Clipboard.CopyText>
              </Button>
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard.Root>
        <div role="status" aria-live="polite">
          {copied ? '复制成功' : '尚未复制'}
        </div>
      </div>
    )
  },
}
export const CustomIndicator: Story = {
  render: function CustomIndicator() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Clipboard.Root value="自定义内容示例">
          <Clipboard.ValueText />
          <Clipboard.Trigger asChild>
            <Button type="button" variant="subtle">
              <Clipboard.Indicator asChild copied={<span>✓</span>}>
                <span>自定义图标</span>
              </Clipboard.Indicator>
              <Clipboard.CopyText copied="完成">自定义文字</Clipboard.CopyText>
            </Button>
          </Clipboard.Trigger>
        </Clipboard.Root>
      </div>
    )
  },
}
export const Store: Story = {
  render: function Store() {
    const clipboard = useClipboard({ value: '独立 Clipboard store', timeout: 1500 })
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Clipboard.RootProvider value={clipboard}>
          <Clipboard.Label>独立 store 与 ValueText</Clipboard.Label>
          <Clipboard.ValueText />
          <Clipboard.Trigger asChild>
            <Button type="button" variant="outline">
              <Clipboard.CopyText copied="store 已复制">复制 store 内容</Clipboard.CopyText>
            </Button>
          </Clipboard.Trigger>
          <Clipboard.Context>
            {(api) => <div role="status">{api.copied ? 'store：已复制' : 'store：等待复制'}</div>}
          </Clipboard.Context>
        </Clipboard.RootProvider>
      </div>
    )
  },
}
