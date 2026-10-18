import { action } from 'storybook/actions'
import type { ChangeEvent } from 'react'
import { Button, Field, Textarea } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  args: {
    size: 'md',
    variant: 'surface',
    placeholder: '输入多行文字',
    rows: 4,
    disabled: false,
    readOnly: false,
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) =>
      action('onChange')({ value: event.currentTarget.value }),
  },
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    variant: {
      control: 'select',
      options: ['flushed', 'outline', 'subtle', 'surface', 'unstyled'],
    },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    onChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '多行输入、字符限制、调整高度和禁用状态。' },
    },
  },
} satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: {
      disable: false,
      include: ['size', 'variant', 'placeholder', 'rows', 'disabled', 'readOnly'],
    },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Textarea {...args} />
    </div>
  ),
}

export const ControlledForm: Story = {
  render: function ControlledForm() {
    const [note, setNote] = useState('')

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
            setNote('')
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <Field.Root>
            <Field.Label>备注</Field.Label>
            <Textarea
              name="note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="输入多行备注"
              rows={4}
              maxLength={200}
              resize="vertical"
            />
            <Field.HelperText>{note.length} / 200 字符，可拖动调整高度。</Field.HelperText>
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
export const Disabled: Story = {
  render: function Disabled() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Field.Root disabled>
          <Field.Label>禁用备注</Field.Label>
          <Textarea defaultValue="从 Field 继承禁用状态" rows={2} variant="subtle" />
        </Field.Root>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Field.Root>
          <Field.Label>Textarea：仅自定尺寸</Field.Label>
          <Textarea
            size="unstyled"
            name="custom-note"
            minHeight="120px"
            p="6"
            textStyle="lg"
            rows={3}
            placeholder="自定内边距和字号，保留 surface"
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Textarea：仅自定外观</Field.Label>
          <Textarea
            variant="unstyled"
            rows={2}
            bg="gray.3"
            borderRadius="xl"
            focusVisibleRing="outside"
            placeholder="保留 md 内边距和字号"
          />
        </Field.Root>
      </div>
    )
  },
}
