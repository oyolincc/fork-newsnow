import { Button, Portal, Select, createListCollection, useSelect } from '@newsnow/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { css } from 'styled-system/css'

interface Framework {
  label: string
  value: string
  category: string
  disabled: boolean
}

const collection = createListCollection<Framework>({
  items: [
    { label: 'React', value: 'react', category: '组件库', disabled: false },
    { label: 'Vue', value: 'vue', category: '渐进式框架', disabled: false },
    { label: 'Solid（禁用）', value: 'solid', category: '细粒度响应式', disabled: true },
    { label: 'Svelte', value: 'svelte', category: '编译型框架', disabled: false },
  ],
})

const meta = {
  title: 'Collections/Select',
  component: Select.Root<Framework>,
  parameters: {
    docs: {
      description: {
        component:
          '支持单选、多选、禁用项、原生表单和外部 store 的选择器。方向键移动，输入英文首字母跳转，Escape 关闭。',
      },
    },
    controls: { include: ['size', 'variant', 'multiple', 'disabled', 'closeOnSelect'] },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'unstyled'] },
    variant: { control: 'inline-radio', options: ['outline', 'surface', 'unstyled'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
    collection: { control: false, table: { disable: true } },
    onValueChange: { control: false },
    onOpenChange: { control: false },
  },
  args: {
    collection,
    size: 'md',
    variant: 'outline',
    multiple: false,
    disabled: false,
    onValueChange: fn<(details: Select.ValueChangeDetails<Framework>) => void>(),
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Select.Root<Framework>>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div className={css({ maxWidth: 'md' })}>
      <Select.Root {...args}>
        <Select.Label>选择框架</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="选择框架" />
            <Select.Indicator />
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {args.collection.items.map((item) => (
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
    </div>
  ),
}

export const ControlledForm: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: {
        story: '受控单选与非受控多选通过 HiddenSelect 参与原生表单提交；禁用项无法选择。',
      },
    },
  },
  render: function ControlledForm(args) {
    const [value, setValue] = useState<string[]>([])
    const [selectedLabel, setSelectedLabel] = useState('尚未选择')
    const [submitted, setSubmitted] = useState('尚未提交')
    return (
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
          onOpenChange={args.onOpenChange}
          onValueChange={(details) => {
            setValue(details.value)
            args.onValueChange?.(details)
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
          onValueChange={args.onValueChange}
          onOpenChange={args.onOpenChange}
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
        <Button type="submit" colorPalette="lime">
          读取原生表单数据
        </Button>
        <p role="status">提交结果：{submitted}</p>
      </form>
    )
  },
}

export const Customization: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={css({ display: 'grid', gap: '4', maxWidth: 'md' })}>
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
    </div>
  ),
}

export const Store: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: {
        story:
          '`useSelect<Framework>` 保留泛型事件中的自定义字段，外部按钮通过 store 选择、打开和清空。',
      },
    },
  },
  render: function Store(args) {
    const [selected, setSelected] = useState('React · 组件库')
    const select = useSelect<Framework>({
      collection,
      defaultValue: ['react'],
      onOpenChange: args.onOpenChange,
      onValueChange: (details: Select.ValueChangeDetails<Framework>) => {
        args.onValueChange?.(details)
        const item = details.items[0]
        setSelected(item ? `${item.label} · ${item.category}` : '尚未选择')
      },
    })
    const triggerProps = { 'aria-label': '选择框架' } satisfies Select.TriggerProps
    return (
      <div className={css({ display: 'grid', gap: '3', maxWidth: 'md' })}>
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
                    <Select.ItemIndicator />
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
    )
  },
}
