import { fn } from 'storybook/test'
import { Button, Switch } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/Switch',
  component: Switch.Root,
  args: { size: 'md', variant: 'solid', disabled: false, onCheckedChange: fn() },
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled', 'xs'] },
    variant: { control: 'select', options: ['solid'] },
    disabled: { control: 'boolean' },
    onCheckedChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '受控与非受控开关、禁用状态和尺寸定制。' },
    },
  },
} satisfies Meta<typeof Switch.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'variant', 'disabled'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Switch.Root {...args}>
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>启用通知</Switch.Label>
      </Switch.Root>
    </div>
  ),
}

export const Controlled: Story = {
  render: function Controlled() {
    const [enabled, setEnabled] = useState(true)

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
            setEnabled(true)
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <Switch.Root
            name="notifications"
            value="enabled"
            checked={enabled}
            onCheckedChange={(details) => setEnabled(details.checked)}>
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label>启用通知</Switch.Label>
          </Switch.Root>
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
export const States: Story = {
  render: function States() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Switch.Root size="sm" defaultChecked>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>小尺寸非受控开关</Switch.Label>
        </Switch.Root>
        <Switch.Root size="lg" disabled defaultChecked>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>大尺寸禁用开关</Switch.Label>
        </Switch.Root>
      </div>
    )
  },
}
export const CustomSize: Story = {
  render: function CustomSize() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Switch.Root size="unstyled" name="custom-switch" gap="4" defaultChecked>
          <Switch.HiddenInput />
          <Switch.Control width="72px" height="36px">
            <Switch.Thumb
              width="36px"
              height="36px"
              scale="0.8"
              _checked={{ translate: '36px 0', _rtl: { translate: '-36px 0' } }}
            />
          </Switch.Control>
          <Switch.Label textStyle="lg">自定开关尺寸和位移，保留 solid</Switch.Label>
        </Switch.Root>
      </div>
    )
  },
}
