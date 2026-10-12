import { Button, Dialog, Portal } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'

export function DialogPreview() {
  const [open, setOpen] = useState(false)
  const [actions, setActions] = useState(0)
  const [blocked, setBlocked] = useState(0)
  const [lastEvent, setLastEvent] = useState('尚未操作')
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section
      aria-labelledby="dialog-heading"
      className={css({ display: 'grid', gap: '4', padding: { base: '6', md: '10' } })}>
      <h2 id="dialog-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Dialog 验收
      </h2>
      <p>检查初始焦点、Tab 焦点循环、Escape 和遮罩关闭；关闭后焦点应返回打开按钮。</p>

      <Dialog.Root
        open={open}
        onOpenChange={(details) => {
          setOpen(details.open)
          setLastEvent(details.open ? '已打开' : '已关闭')
        }}
        initialFocusEl={() => inputRef.current}
        size="lg"
        placement="center"
        scrollBehavior="inside"
        motionPreset="slide-in-bottom">
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
                <label htmlFor="dialog-preview-input">打开后应自动聚焦这里</label>
                <input
                  id="dialog-preview-input"
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

      <Dialog.Root size="sm" placement="top" motionPreset="none">
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

      <p>系统开启减少动态效果时，内容与遮罩直接显隐；none 示例在任意系统偏好下均无动画。</p>
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
    </section>
  )
}
