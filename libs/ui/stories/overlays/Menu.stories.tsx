import { Button, Menu, Portal } from '@newsnow/ui'
import { useState, useId } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Overlays/Menu',
  component: Menu.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '菜单选择、复选与单选项以及右键菜单。' },
    },
  },
} satisfies Meta<typeof Menu.Root>
export default meta
type Story = StoryObj<typeof meta>
export const SelectionAndContextMenu: Story = {
  render: function SelectionAndContextMenu() {
    const [selection, setSelection] = useState('尚未选择')
    const [notifications, setNotifications] = useState(true)
    const [density, setDensity] = useState('comfortable')

    const menu = Menu.useMenu({ onSelect: ({ value }) => setSelection(value) })

    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>菜单选择与右键菜单</h3>
          <Menu.RootProvider value={menu} size="md">
            <Menu.Trigger asChild>
              <Button variant="outline">
                打开菜单
                <Menu.Indicator />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.ItemGroup id={`${storyId}-overlay-actions`}>
                    <Menu.ItemGroupLabel>操作</Menu.ItemGroupLabel>
                    <Menu.Item value="copy">复制</Menu.Item>
                    <Menu.Item value="disabled" disabled>
                      禁用操作
                    </Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.Separator />
                  <Menu.CheckboxItem
                    value="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    closeOnSelect={false}>
                    <Menu.ItemText>开启通知</Menu.ItemText>
                    <Menu.ItemIndicator />
                  </Menu.CheckboxItem>
                  <Menu.RadioItemGroup
                    id={`${storyId}-overlay-density`}
                    value={density}
                    onValueChange={({ value }) => setDensity(value)}>
                    <Menu.ItemGroupLabel>密度</Menu.ItemGroupLabel>
                    <Menu.RadioItem value="comfortable" closeOnSelect={false}>
                      <Menu.ItemText>舒适</Menu.ItemText>
                      <Menu.ItemIndicator />
                    </Menu.RadioItem>
                    <Menu.RadioItem value="compact" closeOnSelect={false}>
                      <Menu.ItemText>紧凑</Menu.ItemText>
                      <Menu.ItemIndicator asChild>
                        <span>✓</span>
                      </Menu.ItemIndicator>
                    </Menu.RadioItem>
                  </Menu.RadioItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.RootProvider>
          <Menu.Root onSelect={({ value }) => setSelection(value)}>
            <Menu.ContextTrigger
              className={css({
                borderWidth: '1px',
                borderStyle: 'dashed',
                borderColor: 'border',
                borderRadius: 'sm',
                p: '4',
              })}>
              在此区域右键，或长按触屏打开上下文菜单。
            </Menu.ContextTrigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="refresh">刷新示例</Menu.Item>
                  <Menu.Item value="inspect">查看信息</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <p role="status">
            选择：{selection}；通知：{notifications ? '开启' : '关闭'}；密度：{density}
          </p>
        </div>
      </div>
    )
  },
}
export const CustomSize: Story = {
  render: function CustomSize() {
    const [, setSelection] = useState('尚未选择')

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Menu.Root size="unstyled" onSelect={({ value }) => setSelection(value)}>
          <Menu.Trigger asChild>
            <Button variant="outline">打开紧凑菜单</Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minWidth="160px" maxHeight="240px" p="1" gap="1" textStyle="sm">
                <Menu.Item value="compact-copy" px="2" minHeight="32px" gap="2">
                  复制
                </Menu.Item>
                <Menu.Item value="compact-save" px="2" minHeight="32px" gap="2">
                  保存
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </div>
    )
  },
}
