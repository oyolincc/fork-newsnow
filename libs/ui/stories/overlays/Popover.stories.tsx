import { Button, Input, Popover, Portal } from '@newsnow/ui'
import { useRef, useState, useId } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Overlays/Popover',
  component: Popover.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '受控浮层、初始焦点、箭头和关闭行为。' },
    },
  },
} satisfies Meta<typeof Popover.Root>
export default meta
type Story = StoryObj<typeof meta>
export const ControlledStore: Story = {
  render: function ControlledStore() {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const popover = Popover.usePopover({
      open: popoverOpen,
      onOpenChange: ({ open }) => setPopoverOpen(open),
      initialFocusEl: () => inputRef.current,
      positioning: { placement: 'bottom-start', gutter: 12 },
    })

    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>受控 Popover</h3>
          <Popover.RootProvider value={popover}>
            <Popover.Trigger asChild>
              <Button variant="outline">打开编辑浮层</Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Header>
                    <Popover.Title>编辑备注</Popover.Title>
                    <Popover.Description>
                      打开后聚焦输入框，Escape 或外部点击可关闭。
                    </Popover.Description>
                  </Popover.Header>
                  <Popover.Body>
                    <label htmlFor={`${storyId}-overlay-note`}>备注</label>
                    <Input
                      id={`${storyId}-overlay-note`}
                      ref={inputRef}
                      placeholder="仅在本地编辑"
                    />
                  </Popover.Body>
                  <Popover.Footer>
                    <Popover.CloseTrigger asChild>
                      <Button size="sm">完成</Button>
                    </Popover.CloseTrigger>
                  </Popover.Footer>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.RootProvider>
          <p role="status">Popover：{popoverOpen ? '已打开' : '已关闭'}</p>
        </div>
      </div>
    )
  },
}
