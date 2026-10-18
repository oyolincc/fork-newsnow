import { Button, Dialog, Portal, useDialog } from '@newsnow/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, useRef, useState } from 'react'
import { fn } from 'storybook/test'
import { css } from 'styled-system/css'

const meta = {
  title: 'Overlays/Dialog',
  component: Dialog.Root,
  parameters: {
    docs: {
      description: { component: '通过 Portal 展示弹窗，支持受控状态、焦点管理和外部 store。' },
    },
    controls: {
      include: [
        'size',
        'placement',
        'scrollBehavior',
        'motionPreset',
        'closeOnEscape',
        'closeOnInteractOutside',
      ],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'cover', 'full', 'unstyled'],
    },
    placement: { control: 'inline-radio', options: ['top', 'center', 'bottom'] },
    scrollBehavior: { control: 'inline-radio', options: ['inside', 'outside'] },
    motionPreset: {
      control: 'select',
      options: [
        'scale',
        'slide-in-bottom',
        'slide-in-top',
        'slide-in-left',
        'slide-in-right',
        'none',
      ],
    },
    closeOnEscape: { control: 'boolean' },
    closeOnInteractOutside: { control: 'boolean' },
    onOpenChange: { control: false },
  },
  args: {
    size: 'md',
    placement: 'center',
    scrollBehavior: 'outside',
    motionPreset: 'scale',
    closeOnEscape: true,
    closeOnInteractOutside: true,
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Dialog.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { size: 'sm', placement: 'top', motionPreset: 'none' },
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <Button variant="outline">打开非受控 Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>非受控 Dialog</Dialog.Title>
              <Dialog.Description>检查小尺寸、顶部定位，以及无动画关闭。</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>此示例由 Ark 自己管理打开状态。</Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button>关闭</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  ),
}

export const Controlled: Story = {
  args: {
    size: 'lg',
    placement: 'center',
    scrollBehavior: 'inside',
    motionPreset: 'slide-in-bottom',
  },
  parameters: {
    docs: {
      source: { type: 'code' },
      description: {
        story:
          '打开后聚焦输入框；Tab 循环、Escape 和遮罩关闭；关闭后焦点返回触发按钮。确认动作关闭弹窗，preventDefault 可阻止关闭。',
      },
    },
  },
  render: function Controlled(args) {
    const [open, setOpen] = useState(false)
    const [actions, setActions] = useState(0)
    const [blocked, setBlocked] = useState(0)
    const [lastEvent, setLastEvent] = useState('尚未操作')
    const inputRef = useRef<HTMLInputElement>(null)
    const inputId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4' })}>
        <Dialog.Root
          {...args}
          open={open}
          onOpenChange={(details) => {
            setOpen(details.open)
            args.onOpenChange?.(details)
            setLastEvent(details.open ? '已打开' : '已关闭')
          }}
          initialFocusEl={() => inputRef.current}>
          <Dialog.Trigger asChild>
            <Button colorPalette="lime">打开受控 Dialog</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Dialog 验收</Dialog.Title>
                  <Dialog.Description>这个弹窗通过 Portal 渲染到页面根部。</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body gap="4">
                  <label htmlFor={inputId}>打开后应自动聚焦这里</label>
                  <input
                    id={inputId}
                    ref={inputRef}
                    className={css({
                      borderWidth: '1px',
                      borderColor: 'border',
                      p: '2',
                      rounded: 'sm',
                    })}
                    placeholder="输入内容测试焦点"
                  />
                  <p>使用 Tab 和 Shift+Tab，焦点应始终停留在弹窗内部。</p>
                  <Dialog.ActionTrigger
                    asChild
                    onClick={(event) => {
                      event.preventDefault()
                      setBlocked((count) => count + 1)
                    }}>
                    <Button variant="outline">阻止关闭</Button>
                  </Dialog.ActionTrigger>
                  <p role="status">已阻止关闭 {blocked} 次</p>
                  {Array.from({ length: 12 }, (_, index) => (
                    <p key={index}>
                      滚动内容 {index + 1}：长内容应在弹窗内部滚动，背景页面保持锁定。
                    </p>
                  ))}
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <Button variant="outline">取消</Button>
                  </Dialog.CloseTrigger>
                  <Dialog.ActionTrigger asChild onClick={() => setActions((count) => count + 1)}>
                    <Button colorPalette="lime">确认并关闭</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>

        <p role="status">
          {lastEvent}；确认动作执行 {actions} 次。
        </p>
      </div>
    )
  },
}

export const CustomSize: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Dialog.Root size="unstyled">
      <Dialog.Trigger asChild>
        <Button variant="outline">打开自定尺寸 Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxWidth="360px" p="4" gap="3" textStyle="sm">
            <Dialog.Header gap="1">
              <Dialog.Title textStyle="lg">紧凑弹窗</Dialog.Title>
              <Dialog.Description textStyle="sm">
                自定尺寸，保留默认外观和焦点行为。
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>宽度 360px，窄屏仍适应可用空间。</Dialog.Body>
            <Dialog.Footer gap="2">
              <Dialog.CloseTrigger asChild>
                <Button size="sm">关闭</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  ),
}

export const Store: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { story: 'useDialog 与 RootProvider 共用 store，外部按钮打开弹窗并恢复焦点。' },
    },
  },
  render: function Store(args) {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const dialog = useDialog({
      onOpenChange: args.onOpenChange,
      finalFocusEl: () => triggerRef.current,
    })
    return (
      <>
        <Button ref={triggerRef} onClick={() => dialog.setOpen(true)}>
          通过 useDialog 打开
        </Button>
        <Dialog.RootProvider value={dialog}>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>包级 hook 与 RootProvider</Dialog.Title>
                  <Dialog.Description>在组件外访问 store，无需额外导入 Ark。</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>外部按钮通过 dialog.setOpen(true) 打开此弹窗。</Dialog.Body>
                <Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <Button variant="outline">关闭</Button>
                  </Dialog.CloseTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.RootProvider>
      </>
    )
  },
}
