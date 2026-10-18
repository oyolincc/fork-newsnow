import { fn } from 'storybook/test'
import { Button, Field, NumberInput } from '@newsnow/ui'
import { useState, useId } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/NumberInput',
  component: NumberInput.Root,
  args: {
    size: 'md',
    variant: 'outline',
    min: 0,
    max: 20,
    step: 1,
    disabled: false,
    onValueChange: fn(),
  },
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled', 'xl'] },
    variant: { control: 'select', options: ['outline', 'surface', 'unstyled'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    onValueChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '数值输入、步进、上下限和原生表单数据。' },
    },
  },
} satisfies Meta<typeof NumberInput.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'variant', 'min', 'max', 'step', 'disabled'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <NumberInput.Root {...args} defaultValue="5">
        <NumberInput.Label>数量</NumberInput.Label>
        <NumberInput.Input />
        <NumberInput.Control />
      </NumberInput.Root>
    </div>
  ),
}

export const ControlledForm: Story = {
  render: function ControlledForm() {
    const [quantity, setQuantity] = useState('5')

    const numberInput = NumberInput.useNumberInput({
      name: 'quantity',
      min: 0,
      max: 20,
      step: 1,
      value: quantity,
      onValueChange: ({ value }) => setQuantity(value),
    })

    const [submittedForm, setSubmittedForm] = useState('尚未提交')
    const storyId = useId()
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
            setQuantity('5')
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <div className={css({ display: 'grid', gap: '3', maxWidth: 'sm' })}>
            <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>数值与边界</h3>
            <Field.Root>
              <Field.Label htmlFor={`${storyId}-advanced-quantity`}>数量（0–20）</Field.Label>
              <NumberInput.RootProvider value={numberInput} size="lg" variant="outline">
                <NumberInput.Input
                  id={`${storyId}-advanced-quantity`}
                  aria-describedby={`${storyId}-advanced-quantity-help`}
                />
                <NumberInput.Control />
              </NumberInput.RootProvider>
              <Field.HelperText id={`${storyId}-advanced-quantity-help`}>
                支持输入、上下键和步进按钮；空值保留为空字符串。
              </Field.HelperText>
            </Field.Root>
            <NumberInput.Root defaultValue="10" disabled size="sm">
              <NumberInput.Input aria-label="禁用的数值输入" />
              <NumberInput.Control />
            </NumberInput.Root>
            <p role="status">数量：{quantity === '' ? '空值' : quantity}</p>
          </div>
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
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <NumberInput.Root
          size="unstyled"
          name="compact-quantity"
          defaultValue="3"
          min={0}
          gap="1.5"
          css={{
            '& [data-part=control]': { width: '20px' },
            '& [data-part=increment-trigger], & [data-part=decrement-trigger]': {
              lineHeight: '1',
              _icon: { boxSize: '3' },
            },
          }}>
          <NumberInput.Label textStyle="sm">自定尺寸的数量</NumberInput.Label>
          <NumberInput.Input height="36px" px="3" paddingInlineEnd="28px" textStyle="sm" />
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Root variant="unstyled" name="custom-quantity" defaultValue="2" min={0}>
          <NumberInput.Label>自定外观，保留 md 尺寸</NumberInput.Label>
          <NumberInput.Input bg="gray.3" borderRadius="lg" focusVisibleRing="inside" />
          <NumberInput.Control height="full" bg="lime.3" borderRadius="md" />
        </NumberInput.Root>
      </div>
    )
  },
}
