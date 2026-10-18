import { fn } from 'storybook/test'
import { Button, PinInput } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/PinInput',
  component: PinInput.Root,
  args: {
    size: 'md',
    variant: 'outline',
    count: 4,
    mask: false,
    disabled: false,
    onValueChange: fn(),
  },
  argTypes: {
    size: { control: 'select', options: ['2xl', 'lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    variant: { control: 'select', options: ['flushed', 'outline', 'subtle', 'unstyled'] },
    count: { control: 'number' },
    mask: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onValueChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '验证码输入、完成事件、遮罩和只读状态。' },
    },
  },
} satisfies Meta<typeof PinInput.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'variant', 'count', 'mask', 'disabled'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <PinInput.Root {...args}>
        <PinInput.Label>验证码</PinInput.Label>
        <PinInput.Control>
          {Array.from({ length: args.count || 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.Root>
    </div>
  ),
}

export const ControlledForm: Story = {
  render: function ControlledForm() {
    const [pin, setPin] = useState(['', '', '', ''])
    const [completed, setCompleted] = useState(false)

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
            setPin(['', '', '', ''])
            setCompleted(false)
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <div className={css({ display: 'grid', gap: '3' })}>
            <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>验证码输入</h3>
            <PinInput.Root
              name="pin"
              count={4}
              otp
              value={pin}
              onValueChange={({ value }) => {
                setPin(value)
                setCompleted(value.length === 4 && value.every((character) => character !== ''))
              }}
              onValueComplete={() => setCompleted(true)}>
              <PinInput.Label>四位数字</PinInput.Label>
              <PinInput.Control>
                {[0, 1, 2, 3].map((index) => (
                  <PinInput.Input key={index} index={index} />
                ))}
              </PinInput.Control>
              <PinInput.HiddenInput />
            </PinInput.Root>
            <PinInput.Root count={4} mask defaultValue={['1', '2', '3', '4']} size="sm" readOnly>
              <PinInput.Label>只读遮罩示例</PinInput.Label>
              <PinInput.Control>
                {[0, 1, 2, 3].map((index) => (
                  <PinInput.Input key={index} index={index} />
                ))}
              </PinInput.Control>
            </PinInput.Root>
            <p role="status">
              {completed ? '输入完成' : '等待输入'}；仅展示本地状态，不发送验证码。
            </p>
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
        <PinInput.Root size="unstyled" name="compact-pin" count={4} gap="1.5">
          <PinInput.Label>自定尺寸的验证码</PinInput.Label>
          <PinInput.Control gap="1.5">
            {[0, 1, 2, 3].map((index) => (
              <PinInput.Input key={index} index={index} width="36px" height="36px" textStyle="sm" />
            ))}
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput.Root>
        <PinInput.Root variant="unstyled" count={4} defaultValue={['1', '2', '3', '4']}>
          <PinInput.Label>自定外观的验证码</PinInput.Label>
          <PinInput.Control>
            {[0, 1, 2, 3].map((index) => (
              <PinInput.Input
                key={index}
                index={index}
                bg="lime.3"
                borderRadius="lg"
                focusVisibleRing="inside"
              />
            ))}
          </PinInput.Control>
        </PinInput.Root>
      </div>
    )
  },
}
