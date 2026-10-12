import { Button, Portal, Select, createListCollection } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react', disabled: false },
    { label: 'Vue', value: 'vue', disabled: false },
    { label: 'Solid（禁用）', value: 'solid', disabled: true },
    { label: 'Svelte', value: 'svelte', disabled: false },
  ],
})

export function SelectPreview() {
  const [value, setValue] = useState<string[]>([])
  const [selectedLabel, setSelectedLabel] = useState('尚未选择')
  const [submitted, setSubmitted] = useState('尚未提交')

  return (
    <section
      aria-labelledby="select-heading"
      className={css({ display: 'grid', gap: '4', padding: { base: '6', md: '10' } })}>
      <h2 id="select-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Select 验收
      </h2>
      <p>检查方向键选择、输入英文首字母跳转、Escape 关闭，以及禁用项跳过。</p>
      <form
        className={css({ display: 'grid', gap: '4', maxWidth: 'md' })}
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          setSubmitted(
            JSON.stringify({ framework: data.get('framework'), tools: data.getAll('tools') }),
          )
        }}>
        <Select.Root
          collection={collection}
          name="framework"
          value={value}
          onValueChange={(details) => {
            setValue(details.value)
            setSelectedLabel(details.items[0]?.label || '尚未选择')
          }}
          size="md"
          variant="outline">
          <Select.Label>受控单选</Select.Label>
          <Select.Control>
            <Select.Trigger>
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
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
        <p role="status">
          当前单选：{selectedLabel}（{value.join(', ') || '空'}）
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setValue(['vue'])
            setSelectedLabel('Vue')
          }}>
          从外部设为 Vue
        </Button>

        <Select.Root
          collection={collection}
          name="tools"
          multiple
          defaultValue={['react']}
          size="lg"
          variant="surface">
          <Select.Label>非受控多选</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="选择多个框架" />
              <Select.Indicator />
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {collection.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>

        <Select.Root collection={collection} disabled size="sm">
          <Select.Label>整体禁用</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="不可操作" />
              <Select.Indicator />
            </Select.Trigger>
          </Select.Control>
          <Select.HiddenSelect />
        </Select.Root>

        <h3>分维度定制 · 紧凑尺寸</h3>
        <Select.Root collection={collection} size="unstyled" name="compact-framework" gap="1.5">
          <Select.Label textStyle="sm">自定尺寸，保留 outline 外观</Select.Label>
          <Select.Control>
            <Select.Trigger
              height="36px"
              px="3"
              gap="2"
              textStyle="sm"
              css={{ _icon: { boxSize: '4' } }}>
              <Select.ValueText placeholder="选择框架" />
              <Select.Indicator />
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content
                p="1"
                gap="1"
                minWidth="var(--reference-width)"
                maxHeight="min(var(--available-height), 240px)"
                textStyle="sm">
                {collection.items.map((item) => (
                  <Select.Item
                    key={item.value}
                    item={item}
                    minHeight="32px"
                    px="2"
                    gap="2"
                    css={{ _icon: { boxSize: '4' } }}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
        <Select.Root collection={collection} variant="unstyled" defaultValue={['vue']}>
          <Select.Label>自定外观，保留 md 尺寸</Select.Label>
          <Select.Control>
            <Select.Trigger bg="gray.3" borderRadius="lg" focusVisibleRing="inside">
              <Select.ValueText />
              <Select.Indicator />
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content bg="gray.2" borderRadius="lg" boxShadow="md">
                {collection.items.map((item) => (
                  <Select.Item
                    key={item.value}
                    item={item}
                    borderRadius="md"
                    css={{ _highlighted: { bg: 'lime.3' }, _disabled: { opacity: 0.5 } }}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator color="lime.11" />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
        <Button type="submit" colorPalette="lime">
          读取原生表单数据
        </Button>
        <p role="status">提交结果：{submitted}</p>
      </form>
    </section>
  )
}
