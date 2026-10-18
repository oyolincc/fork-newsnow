import { Button, Portal, Tooltip as TooltipPrimitive, useTooltip } from '@newsnow/ui'
import { Tooltip } from '@newsnow/ui/tooltip'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  args: { children: null, content: '说明文字' },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '便捷与插槽 API、受控状态、Portal 和外部 store。' },
    },
  },
} satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj<typeof meta>
export const ControlledAndPortal: Story = {
  render: function ControlledAndPortal() {
    const [open, setOpen] = useState(false)
    const [clicks, setClicks] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>悬停或用 Tab 聚焦按钮应显示提示；Escape、失焦或点击可关闭。提示内仅放说明文字。</p>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '4' })}>
          <Tooltip
            content="保存当前设置，不会离开页面。"
            showArrow
            positioning={{ placement: 'top' }}>
            <Button type="button" onClick={() => setClicks((value) => value + 1)}>
              保存设置（提示带箭头）
            </Button>
          </Tooltip>
          <Tooltip
            ref={contentRef}
            content="这是由外部状态控制的提示。"
            open={open}
            onOpenChange={(details) => setOpen(details.open)}
            openDelay={0}
            positioning={{ placement: 'bottom' }}>
            <Button type="button" variant="outline">
              受控提示目标
            </Button>
          </Tooltip>
          <Button type="button" variant="subtle" onClick={() => setOpen((value) => !value)}>
            切换受控提示
          </Button>
          <Tooltip content="禁用提示不应出现。" disabled>
            <Button type="button" variant="outline">
              提示已禁用，按钮可操作
            </Button>
          </Tooltip>
          <Tooltip content="此提示保留在当前 DOM 容器。" portalled={false} openDelay={0}>
            <Button type="button" variant="surface">
              不使用 Portal
            </Button>
          </Tooltip>
        </div>
        <p role="status">
          保存执行 {clicks} 次；受控提示：{open ? '打开' : '关闭'}
        </p>
      </div>
    )
  },
}
export const PrimitiveAndStore: Story = {
  render: function PrimitiveAndStore() {
    const tooltip = useTooltip({ openDelay: 0 })

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4' })}>
          <TooltipPrimitive.Root openDelay={0} positioning={{ placement: 'bottom' }}>
            <TooltipPrimitive.Trigger asChild>
              <Button type="button" variant="outline">
                自由组合提示
              </Button>
            </TooltipPrimitive.Trigger>
            <Portal>
              <TooltipPrimitive.Positioner>
                <TooltipPrimitive.Content>
                  <TooltipPrimitive.Arrow>
                    <TooltipPrimitive.ArrowTip />
                  </TooltipPrimitive.Arrow>
                  自由组合插槽，支持样式属性和 asChild。
                </TooltipPrimitive.Content>
              </TooltipPrimitive.Positioner>
            </Portal>
          </TooltipPrimitive.Root>
          <TooltipPrimitive.RootProvider value={tooltip}>
            <TooltipPrimitive.Trigger asChild>
              <Button type="button" variant="surface">
                store 提示目标
              </Button>
            </TooltipPrimitive.Trigger>
            <Portal>
              <TooltipPrimitive.Positioner>
                <TooltipPrimitive.Content>通过外部 store 控制提示。</TooltipPrimitive.Content>
              </TooltipPrimitive.Positioner>
            </Portal>
          </TooltipPrimitive.RootProvider>
          <Button type="button" variant="subtle" onClick={() => tooltip.setOpen(!tooltip.open)}>
            切换 store 提示
          </Button>
        </div>
      </div>
    )
  },
}
