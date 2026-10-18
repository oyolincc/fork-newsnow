import { fn } from 'storybook/test'
import { Button, Field, PasswordInput } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { hstack } from 'styled-system/patterns'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  args: { size: 'md', variant: 'outline', disabled: false, readOnly: false, onVisibleChange: fn() },
  argTypes: {
    size: { control: 'select', options: ['2xl', '2xs', 'lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    variant: {
      control: 'select',
      options: ['flushed', 'outline', 'subtle', 'surface', 'unstyled'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    onVisibleChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      // Docgen cannot serialize the JSX icon defaults; use the explicit argTypes above.
      extractArgTypes: false,
      source: { type: 'code' },
      description: { component: '密码可见性、ref 聚焦、Field 状态与尾部空间。' },
    },
  },
} satisfies Meta<typeof PasswordInput>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'variant', 'disabled', 'readOnly'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <PasswordInput
        {...args}
        aria-label="密码"
        defaultValue="demo-password"
        autoComplete="new-password"
      />
    </div>
  ),
}

export const ControlledAndStates: Story = {
  render: function ControlledAndStates() {
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('demo-password')

    const passwordRef = useRef<HTMLInputElement>(null)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Field.Root>
          <Field.Label>受控密码和可见状态</Field.Label>
          <PasswordInput
            ref={passwordRef}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            visible={visible}
            onVisibleChange={setVisible}
            autoComplete="new-password"
            rootProps={{ maxWidth: 'md' }}
          />
          <Field.HelperText>
            显示按钮可通过 Tab 和 Enter 操作；切换显示不应提交表单。
          </Field.HelperText>
        </Field.Root>
        <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
          <Button variant="outline" onClick={() => setVisible((value) => !value)}>
            {visible ? '隐藏密码' : '显示密码'}
          </Button>
          <Button variant="outline" onClick={() => passwordRef.current?.focus()}>
            通过 ref 聚焦密码
          </Button>
        </div>
        <Field.Root invalid>
          <Field.Label>默认可见、自定义图标与错误状态</Field.Label>
          <PasswordInput
            defaultVisible
            size="sm"
            variant="surface"
            visibilityIcon={{ on: '+', off: '−' }}
            defaultValue="example"
            autoComplete="new-password"
          />
          <Field.ErrorText>示例错误提示</Field.ErrorText>
        </Field.Root>
        <Field.Root disabled>
          <Field.Label>Field 禁用联动</Field.Label>
          <PasswordInput size="xs" placeholder="输入与显示按钮都应禁用" />
        </Field.Root>
        <PasswordInput
          aria-label="大尺寸密码输入"
          size="2xl"
          variant="subtle"
          placeholder="2xl 尺寸"
        />
      </div>
    )
  },
}
export const CustomSize: Story = {
  render: function CustomSize() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Field.Root>
          <Field.Label>PasswordInput：自定尺寸与尾部预留</Field.Label>
          <PasswordInput
            size="unstyled"
            name="custom-password"
            height="64px"
            ps="6"
            paddingInlineEnd="72px"
            textStyle="lg"
            defaultValue="custom-password"
            autoComplete="new-password"
          />
          <Field.HelperText>
            点击眼睛并检查焦点；长密码不应被按钮遮挡。下面一项使用默认预留空间。
          </Field.HelperText>
          <PasswordInput
            size="unstyled"
            height="40px"
            ps="4"
            defaultValue="fallback-padding"
            autoComplete="new-password"
            aria-label="自动预留尾部空间的密码"
          />
        </Field.Root>
      </div>
    )
  },
}
