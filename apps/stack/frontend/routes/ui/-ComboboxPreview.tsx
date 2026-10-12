import { Button, Combobox, Portal, createListCollection, useListCollection } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

const items = [
  { name: 'React', id: 'react', disabled: false },
  { name: 'Vue', id: 'vue', disabled: false },
  { name: 'Solid（禁用）', id: 'solid', disabled: true },
  { name: 'Svelte', id: 'svelte', disabled: false },
]
const multipleCollection = createListCollection({
  items,
  itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
})

export function ComboboxPreview() {
  const { collection, filter, append } = useListCollection({
    initialItems: items,
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
    filter: (text, query) => text.toLowerCase().includes(query.toLowerCase()),
  })
  const [value, setValue] = useState<string[]>([])
  const [selected, setSelected] = useState('尚未选择')
  const [multipleValue, setMultipleValue] = useState<string[]>(['react'])
  const [added, setAdded] = useState(false)

  return (
    <section
      aria-labelledby="combobox-heading"
      className={css({ display: 'grid', gap: '4', padding: { base: '6', md: '10' } })}>
      <h2 id="combobox-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Combobox 验收
      </h2>
      <p>输入英文过滤，使用方向键和 Enter 选择，Escape 关闭；输入 zzz 检查空状态。</p>
      <div className={css({ display: 'grid', gap: '4', maxWidth: 'md' })}>
        <Combobox.Root
          collection={collection}
          value={value}
          onValueChange={(details) => {
            setValue(details.value)
            setSelected(details.items.map((item) => item.name).join(', ') || '尚未选择')
          }}
          onInputValueChange={(details) => filter(details.inputValue)}
          onOpenChange={(details) => {
            if (details.open) filter('')
          }}
          size="md"
          variant="outline">
          <Combobox.Label>可过滤的受控单选</Combobox.Label>
          <Combobox.Control>
            <Combobox.Input placeholder="输入框架名称" />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger aria-label="清空单选" />
              <Combobox.Trigger aria-label="展开单选列表" />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                <Combobox.Empty>没有匹配的框架</Combobox.Empty>
                {collection.items.map((item) => (
                  <Combobox.Item key={item.id} item={item}>
                    <Combobox.ItemText>{item.name}</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
        <p role="status">
          单选：{selected}（{value.join(', ') || '空'}）
        </p>
        <Button
          variant="outline"
          disabled={added}
          onClick={() => {
            append({ name: 'Angular', id: 'angular', disabled: false })
            setAdded(true)
          }}>
          动态添加 Angular
        </Button>

        <Combobox.Root
          collection={multipleCollection}
          multiple
          value={multipleValue}
          onValueChange={(details) => setMultipleValue(details.value)}
          size="lg"
          variant="surface">
          <Combobox.Label>受控多选</Combobox.Label>
          <Combobox.Control>
            <Combobox.Input placeholder="选择多个框架" />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger aria-label="清空多选" />
              <Combobox.Trigger aria-label="展开多选列表" />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                {multipleCollection.items.map((item) => (
                  <Combobox.Item key={item.id} item={item}>
                    <Combobox.ItemText>{item.name}</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
        <p role="status">多选：{multipleValue.join(', ') || '空'}</p>
        <Button variant="outline" onClick={() => setMultipleValue(['vue', 'svelte'])}>
          从外部设为 Vue + Svelte
        </Button>
      </div>

      <h3>分维度定制 · 紧凑尺寸</h3>
      <Combobox.Root collection={multipleCollection} size="unstyled" maxWidth="md" gap="1.5">
        <Combobox.Label textStyle="sm">自定尺寸，保留 outline 外观</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input
            height="36px"
            px="3"
            paddingInlineEnd="56px"
            textStyle="sm"
            placeholder="选择框架"
          />
          <Combobox.IndicatorGroup px="2" gap="1" css={{ _icon: { boxSize: '4' } }}>
            <Combobox.ClearTrigger aria-label="清空自定尺寸选择" />
            <Combobox.Trigger aria-label="展开自定尺寸列表" />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content
              p="1"
              gap="1"
              minWidth="var(--reference-width)"
              maxHeight="min(var(--available-height), 240px)"
              textStyle="sm">
              {items.map((item) => (
                <Combobox.Item
                  key={item.id}
                  item={item}
                  minHeight="32px"
                  px="2"
                  gap="2"
                  css={{ _icon: { boxSize: '4' } }}>
                  <Combobox.ItemText>{item.name}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
      <Combobox.Root
        collection={multipleCollection}
        variant="unstyled"
        maxWidth="md"
        defaultValue={['react']}>
        <Combobox.Label>自定外观，保留 md 尺寸</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input
            bg="gray.3"
            borderRadius="lg"
            focusVisibleRing="inside"
            aria-label="自定外观的框架"
          />
          <Combobox.IndicatorGroup>
            <Combobox.Trigger aria-label="展开自定外观列表" />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content bg="gray.2" borderRadius="lg" boxShadow="md">
              {items.map((item) => (
                <Combobox.Item
                  key={item.id}
                  item={item}
                  borderRadius="md"
                  css={{ _highlighted: { bg: 'lime.3' }, _disabled: { opacity: 0.5 } }}>
                  <Combobox.ItemText>{item.name}</Combobox.ItemText>
                  <Combobox.ItemIndicator color="lime.11" />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </section>
  )
}
