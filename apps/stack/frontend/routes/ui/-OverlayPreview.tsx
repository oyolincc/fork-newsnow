import { Button, Drawer, HoverCard, Input, Link, Menu, Popover, Portal } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'

export function OverlayPreview() {
  const [selection, setSelection] = useState('尚未选择')
  const [notifications, setNotifications] = useState(true)
  const [density, setDensity] = useState('comfortable')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const menu = Menu.useMenu({ onSelect: ({ value }) => setSelection(value) })
  const popover = Popover.usePopover({
    open: popoverOpen,
    onOpenChange: ({ open }) => setPopoverOpen(open),
    initialFocusEl: () => inputRef.current,
    positioning: { placement: 'bottom-start', gutter: 12 },
  })
  const drawer = Drawer.useDrawer()

  return (
    <section
      aria-labelledby="overlay-heading"
      className={css({ display: 'grid', gap: '6', padding: { base: '6', md: '10' } })}>
      <h2 id="overlay-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Menu、Popover、HoverCard、Drawer
      </h2>
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
                <Menu.ItemGroup id="overlay-actions">
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
                  id="overlay-density"
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
                  <label htmlFor="overlay-note">备注</label>
                  <Input id="overlay-note" ref={inputRef} placeholder="仅在本地编辑" />
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
                    <label htmlFor="drawer-note">输入内容</label>
                    <Input id="drawer-note" placeholder="测试焦点循环" />
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

      <p>自定尺寸保留默认外观；系统开启减少动态效果时，浮层直接显隐，定位与焦点行为不变。</p>
      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
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
    </section>
  )
}
