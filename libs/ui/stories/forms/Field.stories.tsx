import { Button, Field } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/Field',
  component: Field.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '标签关联、必填校验、错误提示、只读与禁用。' },
    },
  },
} satisfies Meta<typeof Field.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Validation: Story = {
  render: function Validation() {
    const [username, setUsername] = useState('')
    const [validated, setValidated] = useState(false)
    const [submitted, setSubmitted] = useState('尚未提交')
    const invalid = validated && username.trim().length < 3
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>点击标签应聚焦输入框；提交空值或不足 3 个字符时显示错误，修改后自动恢复。</p>
        <form
          noValidate
          className={css({ display: 'grid', gap: '4', maxWidth: 'md' })}
          onSubmit={(event) => {
            event.preventDefault()
            setValidated(true)
            if (username.trim().length < 3) {
              setSubmitted('验证未通过')
              const input = event.currentTarget.elements.namedItem('username')
              if (input instanceof HTMLInputElement) input.focus()
              return
            }
            setSubmitted(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))))
          }}>
          <Field.Root required invalid={invalid}>
            <Field.Label>
              用户名 <Field.RequiredIndicator>（必填）</Field.RequiredIndicator>
            </Field.Label>
            <Field.Input
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="输入至少 3 个字符"
            />
            <Field.HelperText>用于公开展示，至少 3 个字符。</Field.HelperText>
            <Field.ErrorText>用户名至少需要 3 个字符。</Field.ErrorText>
          </Field.Root>
          <Field.Root disabled>
            <Field.Label>禁用字段</Field.Label>
            <Field.Input name="disabled" defaultValue="不可编辑，也不参与提交" variant="surface" />
            <Field.HelperText>禁用状态从 Field.Root 传给输入框。</Field.HelperText>
          </Field.Root>
          <Field.Root readOnly>
            <Field.Label>只读字段</Field.Label>
            <Field.Input name="account" defaultValue="demo-account" variant="subtle" />
            <Field.HelperText>可聚焦和复制，参与表单提交。</Field.HelperText>
          </Field.Root>
          <Button type="submit">验证并读取表单</Button>
          <p role="status">Field 提交结果：{submitted}</p>
        </form>
      </div>
    )
  },
}
