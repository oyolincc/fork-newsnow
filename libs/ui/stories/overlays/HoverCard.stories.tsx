import { HoverCard, Link, Portal } from '@newsnow/ui'

import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Overlays/HoverCard',
  component: HoverCard.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '悬停与聚焦时显示补充信息。' },
    },
  },
} satisfies Meta<typeof HoverCard.Root>
export default meta
type Story = StoryObj<typeof meta>
export const HoverAndFocus: Story = {
  render: function HoverAndFocus() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>HoverCard 补充信息</h3>
          <HoverCard.Root openDelay={200} closeDelay={200} positioning={{ placement: 'top-start' }}>
            <HoverCard.Trigger asChild>
              <Link href="#overlay-heading">查看 UI 库信息</Link>
            </HoverCard.Trigger>
            <Portal>
              <HoverCard.Positioner>
                <HoverCard.Content>
                  <HoverCard.Arrow>
                    <HoverCard.ArrowTip />
                  </HoverCard.Arrow>
                  <strong>@newsnow/ui</strong>
                  <p>Ark 处理行为，Panda 生成样式，组件源码在仓库内维护。</p>
                </HoverCard.Content>
              </HoverCard.Positioner>
            </Portal>
          </HoverCard.Root>
          <p>悬停或聚焦链接展示补充信息，移动到卡片时保持显示。</p>
        </div>
      </div>
    )
  },
}
