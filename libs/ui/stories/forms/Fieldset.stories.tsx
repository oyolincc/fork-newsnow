import { Button, Field, Fieldset, Group, Input, InputAddon, InputGroup } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/Fieldset',
  component: Fieldset.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '字段组的禁用、校验和表单提交。' },
    },
  },
} satisfies Meta<typeof Fieldset.Root>
export default meta
type Story = StoryObj<typeof meta>
export const ValidationAndForm: Story = {
  render: function ValidationAndForm() {
    const [disabled, setDisabled] = useState(false)
    const [invalid, setInvalid] = useState(false)

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
          <div className={css({ display: 'grid', gap: '3' })}>
            <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
              Fieldset 与输入组合
            </h3>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDisabled((value) => !value)}>
                {disabled ? '启用字段组' : '禁用字段组'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setInvalid((value) => !value)}>
                {invalid ? '清除错误' : '显示错误'}
              </Button>
            </div>
            <Fieldset.Root disabled={disabled} invalid={invalid} flexDirection="column" gap="3">
              <Fieldset.Legend>账户信息</Fieldset.Legend>
              <Fieldset.HelperText>
                组合组件继承原生表单语义，禁用字段不参与 FormData。
              </Fieldset.HelperText>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>账户标识</Field.Label>
                  <InputGroup
                    startElement={<span aria-hidden="true">@</span>}
                    endElement={<span aria-hidden="true">✓</span>}>
                    <Input name="account" defaultValue="newsnow" />
                  </InputGroup>
                </Field.Root>
                <Field.Root>
                  <Field.Label>零值装饰元素</Field.Label>
                  <InputGroup startElement={0} size="sm">
                    <Input name="sequence" placeholder="左侧的 0 应可见" size="sm" />
                  </InputGroup>
                </Field.Root>
                <Field.Root>
                  <Field.Label>可调整的装饰元素</Field.Label>
                  <InputGroup
                    startElement="https://"
                    startElementProps={{ minW: '20', pointerEvents: 'none', color: 'fg' }}
                    startOffset="-3rem"
                    endElement="域名"
                    endElementProps={{ minW: '16' }}
                    endOffset="-1.5rem">
                    <Input placeholder="example.com" />
                  </InputGroup>
                </Field.Root>
                <Field.Root>
                  <Field.Label>站点域名</Field.Label>
                  <Group attached width="full">
                    <InputAddon>https://</InputAddon>
                    <Input name="domain" defaultValue="example" />
                    <InputAddon>.com</InputAddon>
                  </Group>
                </Field.Root>
              </Fieldset.Content>
              <Fieldset.ErrorText>这是本地演示错误，字段组需要重新检查。</Fieldset.ErrorText>
            </Fieldset.Root>
            <p role="status">
              字段组：{disabled ? '禁用' : '启用'}；错误：{invalid ? '显示' : '无'}
            </p>
          </div>
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
