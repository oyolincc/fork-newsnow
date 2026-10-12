import { Button, Tabs } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'

function PanelCounter({ label }: { label: string }) {
  const [count, setCount] = useState(0)
  return (
    <Button type="button" variant="outline" onClick={() => setCount((value) => value + 1)}>
      {label}计数：{count}
    </Button>
  )
}

export function TabsPreview() {
  const [value, setValue] = useState('overview')
  const [focusedValue, setFocusedValue] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <section
      aria-labelledby="tabs-heading"
      className={css({ display: 'grid', gap: '4', padding: { base: '6', md: '10' } })}>
      <h2 id="tabs-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Tabs 验收
      </h2>
      <p>水平自动模式：左右方向键切换并跳过禁用项，Home/End 跳到首尾；计数应在切换后保留。</p>
      <Tabs.Root
        value={value}
        onValueChange={(details) => setValue(details.value)}
        onFocusChange={(details) => setFocusedValue(details.focusedValue)}
        lazyMount
        variant="line"
        size="md"
        maxWidth="xl">
        <Tabs.List aria-label="受控自动切换">
          <Tabs.Trigger
            ref={triggerRef}
            value="overview"
            css={{
              _focus: {
                outline: '2px solid',
                outlineColor: 'colorPalette.solid.bg',
                outlineOffset: '2px',
              },
            }}>
            概览
          </Tabs.Trigger>
          <Tabs.Trigger value="disabled" disabled>
            禁用标签
          </Tabs.Trigger>
          <Tabs.Trigger value="settings">设置</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="overview">
          <PanelCounter label="概览" />
        </Tabs.Content>
        <Tabs.Content value="settings">
          <PanelCounter label="设置" />
        </Tabs.Content>
      </Tabs.Root>
      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
        <Button type="button" variant="outline" onClick={() => setValue('settings')}>
          从外部切到设置
        </Button>
        <Button type="button" variant="outline" onClick={() => triggerRef.current?.focus()}>
          通过 ref 聚焦概览
        </Button>
      </div>
      <p role="status">
        当前受控标签：{value}；焦点标签：{focusedValue || '无'}
      </p>
      <p>通过 ref 聚焦只移动焦点，不切换选中项；聚焦概览后可用 Enter/空格选中。</p>

      <p>垂直手动模式：上下方向键仅移动焦点，Enter/空格确认；退出面板再返回时计数归零。</p>
      <Tabs.Root
        defaultValue="profile"
        orientation="vertical"
        activationMode="manual"
        lazyMount
        unmountOnExit
        variant="subtle"
        size="sm">
        <Tabs.List aria-label="垂直手动切换">
          <Tabs.Trigger value="profile">资料</Tabs.Trigger>
          <Tabs.Trigger value="activity">活动</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="profile">
          <PanelCounter label="资料" />
        </Tabs.Content>
        <Tabs.Content value="activity">
          <PanelCounter label="活动" />
        </Tabs.Content>
      </Tabs.Root>

      <Tabs.Root defaultValue="first" variant="enclosed" size="lg" fitted maxWidth="xl">
        <Tabs.List aria-label="等宽标签">
          <Tabs.Trigger value="first">第一项</Tabs.Trigger>
          <Tabs.Trigger value="second">第二项</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="first">Enclosed：第一项面板</Tabs.Content>
        <Tabs.Content value="second">Enclosed：第二项面板</Tabs.Content>
      </Tabs.Root>

      <p>分维度定制：紧凑尺寸保留 line 外观；自定外观保留默认尺寸与键盘切换。</p>
      <Tabs.Root defaultValue="first" size="unstyled" gap="2">
        <Tabs.List aria-label="自定尺寸标签">
          <Tabs.Trigger value="first" height="32px" px="3" textStyle="sm">
            概览
          </Tabs.Trigger>
          <Tabs.Trigger value="second" height="32px" px="3" textStyle="sm">
            详情
          </Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="first">自定尺寸：概览</Tabs.Content>
        <Tabs.Content value="second">自定尺寸：详情</Tabs.Content>
      </Tabs.Root>
      <Tabs.Root defaultValue="first" variant="unstyled">
        <Tabs.List aria-label="自定外观标签">
          <Tabs.Trigger
            value="first"
            borderRadius="full"
            focusVisibleRing="outside"
            css={{ _selected: { bg: 'lime.3', color: 'lime.11' } }}>
            概览
          </Tabs.Trigger>
          <Tabs.Trigger
            value="second"
            borderRadius="full"
            focusVisibleRing="outside"
            css={{ _selected: { bg: 'lime.3', color: 'lime.11' } }}>
            详情
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="first" focusVisibleRing="inside">
          自定外观：概览
        </Tabs.Content>
        <Tabs.Content value="second" focusVisibleRing="inside">
          自定外观：详情
        </Tabs.Content>
      </Tabs.Root>
    </section>
  )
}
