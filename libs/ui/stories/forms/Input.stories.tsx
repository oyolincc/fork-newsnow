import { action } from 'storybook/actions'
import type { ChangeEvent } from 'react'
import { Button, Field, Input } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/Input',
  component: Input,
  args: {
    size: 'md',
    variant: 'outline',
    placeholder: '输入文字',
    disabled: false,
    readOnly: false,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      action('onChange')({ value: event.currentTarget.value }),
  },
  argTypes: {
    size: { control: 'select', options: ['2xl', '2xs', 'lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    variant: {
      control: 'select',
      options: ['flushed', 'outline', 'subtle', 'surface', 'unstyled'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    onChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '单行输入、Field 状态继承和外观定制。' },
    },
  },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: {
      disable: false,
      include: ['size', 'variant', 'placeholder', 'disabled', 'readOnly'],
    },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Input {...args} />
    </div>
  ),
}

export const ControlledForm: Story = {
  render: function ControlledForm() {
    const [title, setTitle] = useState('')

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
          onReset={() => {
            setTitle('')
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <Field.Root>
            <Field.Label>标题</Field.Label>
            <Input
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="输入标题"
            />
            <Field.HelperText>独立 Input 也能继承 Field 的标签和描述。</Field.HelperText>
          </Field.Root>
          <div className={css({ display: 'flex', gap: '3' })}>
            <Button type="submit">读取本地 FormData</Button>
            <Button type="reset" variant="outline">
              重置
            </Button>
          </div>
          <pre role="status" className={css({ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' })}>
            {submittedForm}
          </pre>
        </form>
      </div>
    )
  },
}
export const Variants: Story = {
  tags: ['!dev'],
  render: function Variants() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>Outline 背景透明，Surface 自带背景；使用对比背景展示两者差异。</p>
        <div
          className={css({
            display: 'grid',
            gap: '3',
            bg: 'gray.3',
            padding: '4',
            borderRadius: 'md',
          })}>
          <Input aria-label="Outline 输入" variant="outline" defaultValue="Outline：透明背景" />
          <Input aria-label="Surface 输入" variant="surface" defaultValue="Surface：填充背景" />
          <Input aria-label="Subtle 输入" variant="subtle" defaultValue="Subtle" />
          <Input aria-label="Flushed 输入" variant="flushed" defaultValue="Flushed" />
        </div>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Field.Root>
          <Field.Label>Input：仅自定尺寸</Field.Label>
          <Input
            size="unstyled"
            name="custom-title"
            height="60px"
            px="6"
            textStyle="lg"
            placeholder="60px 高度，保留 outline"
          />
        </Field.Root>
        <Field.Root invalid>
          <Field.Label>Input：仅自定外观，错误状态由页面提供</Field.Label>
          <Input
            variant="unstyled"
            name="custom-appearance"
            defaultValue="保留 md 尺寸"
            bg="gray.3"
            borderRadius="full"
            focusVisibleRing="outside"
            _invalid={{ outline: '2px solid', outlineColor: 'red.9' }}
          />
          <Field.ErrorText>示例错误：自定外观仍接收 Field 状态。</Field.ErrorText>
        </Field.Root>
      </div>
    )
  },
}
