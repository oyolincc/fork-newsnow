import { Button, Drawer, Input, Portal } from '@newsnow/ui'
import { useId } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Overlays/Drawer',
  component: Drawer.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '侧边、底部抽屉与尺寸定制。' },
    },
  },
} satisfies Meta<typeof Drawer.Root>
export default meta
type Story = StoryObj<typeof meta>
export const SideAndBottom: Story = {
  render: function SideAndBottom() {
    const drawer = Drawer.useDrawer()
    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>侧边与底部 Drawer</h3>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
            <Drawer.RootProvider value={drawer} placement="end" size="md">
              <Drawer.Trigger asChild>
                <Button variant="outline">打开侧边抽屉</Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>侧边抽屉</Drawer.Title>
                      <Drawer.Description>通过 useDrawer 与 RootProvider 组合。</Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body gap="3">
                      <label htmlFor={`${storyId}-drawer-note`}>输入内容</label>
                      <Input id={`${storyId}-drawer-note`} placeholder="测试焦点循环" />
                      {Array.from({ length: 20 }, (_, index) => (
                        <p key={index}>滚动内容 {index + 1}：长内容应在抽屉内部滚动。</p>
                      ))}
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.CloseTrigger asChild>
                        <Button variant="outline">关闭</Button>
                      </Drawer.CloseTrigger>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.RootProvider>
            <Drawer.Root placement="bottom" size="lg">
              <Drawer.Trigger asChild>
                <Button variant="outline">打开底部抽屉</Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>底部抽屉</Drawer.Title>
                      <Drawer.Description>底部定位使用全宽布局。</Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>支持遮罩、Escape 关闭，以及关闭后的焦点恢复。</Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.CloseTrigger asChild>
                        <Button>完成</Button>
                      </Drawer.CloseTrigger>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </div>
        </div>
      </div>
    )
  },
}
export const CustomSize: Story = {
  render: function CustomSize() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Drawer.Root size="unstyled" placement="end">
          <Drawer.Trigger asChild>
            <Button variant="outline">打开紧凑抽屉</Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content maxWidth="320px" p="4" gap="3">
                <Drawer.Header gap="1">
                  <Drawer.Title textStyle="lg">紧凑抽屉</Drawer.Title>
                  <Drawer.Description textStyle="sm">自定宽度与内部间距。</Drawer.Description>
                </Drawer.Header>
                <Drawer.Body>默认滑入方向仍由 placement 决定。</Drawer.Body>
                <Drawer.Footer gap="2">
                  <Drawer.CloseTrigger asChild>
                    <Button size="sm">关闭</Button>
                  </Drawer.CloseTrigger>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </div>
    )
  },
}
