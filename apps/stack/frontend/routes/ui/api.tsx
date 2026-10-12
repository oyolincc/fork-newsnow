import {
  Button,
  Combobox,
  Dialog,
  Portal,
  Select,
  createListCollection,
  useCombobox,
  useDialog,
  useSelect,
} from '@newsnow/ui'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { css } from 'styled-system/css'

interface Framework {
  value: string
  label: string
  category: string
}

const collection = createListCollection<Framework>({
  items: [
    { value: 'react', label: 'React', category: '组件库' },
    { value: 'vue', label: 'Vue', category: '渐进式框架' },
    { value: 'solid', label: 'Solid', category: '细粒度响应式' },
  ],
})

const triggerProps = { 'aria-label': '选择框架' } satisfies Select.TriggerProps

export const Route = createFileRoute('/ui/api')({ component: ApiPreview })

function ApiPreview() {
  const [selected, setSelected] = useState('React · 组件库')
  const [suggestion, setSuggestion] = useState('尚未选择')
  const select = useSelect({
    collection,
    defaultValue: ['react'],
    onValueChange: (details: Select.ValueChangeDetails<Framework>) => {
      const item = details.items[0]
      setSelected(item ? `${item.label} · ${item.category}` : '尚未选择')
    },
  })
  const comboboxProps = {
    collection,
    onValueChange: (details: Combobox.ValueChangeDetails<Framework>) => {
      setSuggestion(details.items[0]?.category || '尚未选择')
    },
  } satisfies Combobox.RootProps<Framework>
  const combobox = useCombobox(comboboxProps)
  const dialog = useDialog()

  return (
    <section
      aria-labelledby="api-heading"
      className={css({
        display: 'grid',
        gap: '6',
        padding: { base: '6', md: '10' },
        maxWidth: '3xl',
      })}>
      <h2 id="api-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        类型与 store API
      </h2>
      <p>hook、插槽 Props 和事件类型都从 UI 包获取；外部按钮通过 store 控制组件。</p>

      <div className={css({ display: 'grid', gap: '3' })}>
        <Select.RootProvider value={select} size="md" variant="outline">
          <Select.Label>Select.RootProvider</Select.Label>
          <Select.Control>
            <Select.Trigger {...triggerProps}>
              <Select.ValueText placeholder="选择框架" />
              <Select.Indicator />
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {collection.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator aria-label="已选择">
                      <span aria-hidden="true">✓</span>
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.RootProvider>
        <div className={css({ display: 'flex', gap: '2', flexWrap: 'wrap' })}>
          <Button variant="outline" onClick={() => select.setValue(['vue'])}>
            外部设为 Vue
          </Button>
          <Button variant="outline" onClick={() => select.setOpen(true)}>
            外部打开
          </Button>
          <Button variant="outline" onClick={() => select.clearValue()}>
            清空
          </Button>
        </div>
        <p role="status">泛型事件中的自定义字段：{selected}</p>
      </div>

      <div className={css({ display: 'grid', gap: '3' })}>
        <Combobox.RootProvider value={combobox} size="md" variant="outline">
          <Combobox.Label>Combobox 的泛型 Props 与 RootProvider</Combobox.Label>
          <Combobox.Control>
            <Combobox.Input placeholder="输入或选择框架（此示例不做过滤）" />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger aria-label="清空框架" />
              <Combobox.Trigger aria-label="打开框架列表" />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                {collection.items.map((item) => (
                  <Combobox.Item key={item.value} item={item}>
                    <Combobox.ItemText>{item.label}</Combobox.ItemText>
                    <Combobox.ItemIndicator aria-label="已选择">
                      <span aria-hidden="true">✓</span>
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.RootProvider>
        <div className={css({ display: 'flex', gap: '2', flexWrap: 'wrap' })}>
          <Button variant="outline" onClick={() => combobox.setValue(['solid'])}>
            外部设为 Solid
          </Button>
          <Button variant="outline" onClick={() => combobox.setOpen(true)}>
            外部打开
          </Button>
        </div>
        <p role="status">泛型事件中的自定义字段：{suggestion}</p>
      </div>

      <div className={css({ display: 'grid', gap: '3' })}>
        <Button width="fit-content" onClick={() => dialog.setOpen(true)}>
          通过 useDialog 打开
        </Button>
        <Dialog.RootProvider value={dialog}>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>包级 hook 与 RootProvider</Dialog.Title>
                  <Dialog.Description>现有 Dialog.Root 受控方式仍可继续使用。</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>在组件外访问 store，无需额外导入 Ark。</Dialog.Body>
                <Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <Button variant="outline">关闭</Button>
                  </Dialog.CloseTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.RootProvider>
      </div>
    </section>
  )
}
