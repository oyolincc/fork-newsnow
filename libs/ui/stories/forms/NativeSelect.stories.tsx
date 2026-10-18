import { Button, Field, Heading, NativeSelect, Text } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { hstack } from 'styled-system/patterns'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/NativeSelect',
  component: NativeSelect.Root,
  args: { size: 'md', variant: 'outline', disabled: false },
  argTypes: {
    size: { control: 'select', options: ['2xl', '2xs', 'lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    variant: {
      control: 'select',
      options: ['flushed', 'outline', 'subtle', 'surface', 'unstyled'],
    },
    disabled: { control: 'boolean' },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '原生选项、分组、键盘行为和表单提交。' },
    },
  },
} satisfies Meta<typeof NativeSelect.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'variant', 'disabled'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <NativeSelect.Root {...args}>
        <NativeSelect.Field aria-label="选择框架" defaultValue="react">
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option disabled value="solid">
            Solid（禁用）
          </option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </div>
  ),
}

export const ControlledAndStates: Story = {
  render: function ControlledAndStates() {
    const [framework, setFramework] = useState('react')
    const [disabled, setDisabled] = useState(false)

    const selectRef = useRef<HTMLSelectElement>(null)
    const [submittedForm, setSubmittedForm] = useState('尚未提交')
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            setSubmittedForm(
              JSON.stringify(Array.from(new FormData(event.currentTarget).entries())),
            )
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <Field.Root required>
            <Field.Label>
              原生选择框
              <Field.RequiredIndicator />
            </Field.Label>
            <NativeSelect.Root size="md" disabled={disabled} maxWidth="md">
              <NativeSelect.Field
                ref={selectRef}
                placeholder="请选择框架"
                value={framework}
                onChange={(event) => setFramework(event.target.value)}
                name="framework">
                <optgroup label="框架">
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="angular">Angular</option>
                </optgroup>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.HelperText>当前值：{framework || '未选择'}</Field.HelperText>
          </Field.Root>
          <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
            <Button variant="outline" onClick={() => setDisabled((value) => !value)}>
              选择框：{disabled ? '已禁用' : '可用'}
            </Button>
            <Button
              variant="outline"
              disabled={disabled}
              onClick={() => selectRef.current?.focus()}>
              通过 ref 聚焦选择框
            </Button>
          </div>
          <Field.Root invalid disabled>
            <Field.Label>Field 错误与禁用联动</Field.Label>
            <NativeSelect.Root size="sm" variant="surface">
              <NativeSelect.Field defaultValue="" placeholder="请选择">
                <option value="one">选项一</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator>⌄</NativeSelect.Indicator>
            </NativeSelect.Root>
            <Field.ErrorText>示例错误提示</Field.ErrorText>
          </Field.Root>
          <NativeSelect.Root size="lg" variant="subtle" invalid>
            <NativeSelect.Field aria-label="根入口错误状态" placeholder="根入口 invalid">
              <option value="one">选项一</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Text>NativeSelect 保留原生 option / optgroup、表单提交和浏览器键盘行为。</Text>
          <div className={css({ display: 'flex', gap: '3' })}>
            <Button type="submit">读取本地 FormData</Button>
          </div>
          <pre role="status" className={css({ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' })}>
            {submittedForm}
          </pre>
        </form>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading size="md">NativeSelect · 分维度定制</Heading>
        <NativeSelect.Root size="unstyled" maxWidth="md" textStyle="sm">
          <NativeSelect.Field
            height="36px"
            px="3"
            paddingInlineEnd="36px"
            aria-label="自定尺寸的原生选择">
            <option value="react">React</option>
            <option value="vue">Vue</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator width="36px" css={{ _icon: { boxSize: '4' } }} />
        </NativeSelect.Root>
        <NativeSelect.Root variant="unstyled" maxWidth="md">
          <NativeSelect.Field
            bg="gray.3"
            borderRadius="lg"
            focusVisibleRing="inside"
            aria-label="自定外观的原生选择">
            <option value="react">React</option>
            <option value="vue">Vue</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator color="lime.11" />
        </NativeSelect.Root>
      </div>
    )
  },
}
