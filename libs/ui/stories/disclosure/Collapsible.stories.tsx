import { Button, Collapsible } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Disclosure/Collapsible',
  component: Collapsible.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '按需挂载、退出卸载与内容内关闭。' },
    },
  },
} satisfies Meta<typeof Collapsible.Root>
export default meta
type Story = StoryObj<typeof meta>
export const LazyMount: Story = {
  render: function LazyMount() {
    const [open, setOpen] = useState(false)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Collapsible.Root
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
          lazyMount
          unmountOnExit
          maxWidth="xl">
          <Collapsible.Trigger asChild>
            <Button type="button" variant="outline">
              {open ? '收起详情' : '展开详情'}
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div
              className={css({
                padding: '4',
                borderWidth: '1px',
                borderRadius: 'md',
                marginTop: '3',
              })}>
              <p>首次展开才挂载，关闭动画结束后卸载。</p>
              <Button type="button" variant="plain" onClick={() => setOpen(false)}>
                从内容内部关闭
              </Button>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    )
  },
}
