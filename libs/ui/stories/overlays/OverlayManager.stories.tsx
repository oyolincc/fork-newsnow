import {
  Button,
  CloseButton,
  Dialog,
  Drawer,
  Input,
  Portal,
  Text,
  createOverlay,
  type CreateOverlayProps,
} from '@newsnow/ui'
import { useEffect, useId, useRef, useState } from 'react'
import { hstack } from 'styled-system/patterns'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'
interface ConfirmProps extends CreateOverlayProps<boolean> {
  title: string
  description: string
  finalFocusEl?: () => HTMLElement | null
  onConfirm: () => void
  onUpdate: () => void
  onReopen: () => void
  onRemove: () => void
}
function ConfirmOverlay(props: ConfirmProps) {
  const { title, description, onConfirm, onUpdate, onReopen, onRemove } = props
  const inputId = useId()
  return (
    <Dialog.Root
      open={props.open}
      onOpenChange={props.onOpenChange}
      onExitComplete={props.onExitComplete}
      finalFocusEl={props.finalFocusEl}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>{description}</Dialog.Description>
            </Dialog.Header>
            <Dialog.Body gap="3">
              <label htmlFor={inputId}>本地备注</label>
              <Input id={inputId} placeholder="更新标题会保留输入；同 ID 重开会重置" />
              <div className={hstack({ gap: '2', flexWrap: 'wrap' })}>
                <Button variant="outline" size="sm" onClick={onUpdate}>
                  动态更新
                </Button>
                <Button variant="outline" size="sm" onClick={onReopen}>
                  同 ID 重开
                </Button>
                <Button variant="outline" size="sm" onClick={onRemove}>
                  直接移除
                </Button>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild position="static">
                <Button variant="outline">取消</Button>
              </Dialog.CloseTrigger>
              <Button onClick={onConfirm}>确认并返回 true</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
interface DrawerProps extends CreateOverlayProps {
  finalFocusEl?: () => HTMLElement | null
  onRemoveAll: () => void
}
function ManagedDrawer(props: DrawerProps) {
  const { onRemoveAll } = props
  const inputId = useId()
  return (
    <Drawer.Root
      open={props.open}
      onOpenChange={props.onOpenChange}
      onExitComplete={props.onExitComplete}
      finalFocusEl={props.finalFocusEl}
      placement="end"
      size="md">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>命令式 Drawer</Drawer.Title>
              <Drawer.Description>行为与配方复用现有 Drawer。</Drawer.Description>
            </Drawer.Header>
            <Drawer.Body gap="3">
              <label htmlFor={inputId}>备注</label>
              <Input id={inputId} placeholder="仅本地交互" />
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={onRemoveAll}>
                立即移除全部实例
              </Button>
              <Drawer.CloseTrigger asChild position="static">
                <Button>关闭</Button>
              </Drawer.CloseTrigger>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
const meta = {
  title: 'Overlays/OverlayManager',
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '命令式弹层的返回值、更新、同 ID 重开和生命周期清理。' },
    },
  },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Lifecycle: Story = {
  render: function Lifecycle() {
    const [confirm] = useState(() => createOverlay<ConfirmProps, boolean>(ConfirmOverlay))
    const [drawer] = useState(() => createOverlay<DrawerProps>(ManagedDrawer))
    const [result, setResult] = useState('尚未打开')
    const [lifecycle, setLifecycle] = useState('尚无回调')
    const confirmTriggerRef = useRef<HTMLButtonElement>(null)
    const drawerTriggerRef = useRef<HTMLButtonElement>(null)
    const active = useRef(false)
    const request = useRef(0)
    useEffect(() => {
      active.current = true
      return () => {
        active.current = false
        confirm.removeAll()
        drawer.removeAll()
      }
    }, [confirm, drawer])
    async function openConfirm() {
      const currentRequest = ++request.current
      setResult('等待选择…')
      const answer = await confirm.open('confirm', {
        title: '确认操作',
        description: 'Escape、关闭按钮或遮罩返回 undefined；确认返回 true。',
        finalFocusEl: () => confirmTriggerRef.current,
        onOpenChange: ({ open }) => setLifecycle(`onOpenChange：${open ? '打开' : '关闭'}`),
        onExitComplete: () => setLifecycle('onExitComplete：退场完成'),
        onConfirm: () => {
          void confirm.close('confirm', true)
        },
        onUpdate: () =>
          confirm.update('confirm', {
            title: '标题已更新',
            description: 'update 只更新属性，保留组件状态。',
          }),
        onReopen: () => {
          void openConfirm()
        },
        onRemove: () => confirm.remove('confirm'),
      })
      if (!active.current || currentRequest !== request.current) return
      setResult(`返回值：${String(answer)}；等待退场…`)
      await confirm.waitForExit('confirm')
      if (active.current && currentRequest === request.current) {
        setResult(`返回值：${String(answer)}；退场完成`)
      }
    }
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Text>createOverlay 创建管理器，在使用范围内挂载一次 Viewport；示例卸载时清理实例。</Text>
        <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
          <Button
            ref={confirmTriggerRef}
            onClick={() => {
              void openConfirm()
            }}>
            打开确认 Dialog
          </Button>
          <Button
            ref={drawerTriggerRef}
            variant="outline"
            onClick={() => {
              void drawer.open('drawer', {
                finalFocusEl: () => drawerTriggerRef.current,
                onRemoveAll: () => drawer.removeAll(),
              })
            }}>
            打开 Drawer
          </Button>
        </div>
        <Text role="status">{result}</Text>
        <Text role="status">{lifecycle}</Text>
        <confirm.Viewport />
        <drawer.Viewport />
      </div>
    )
  },
}
