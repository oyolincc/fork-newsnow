import { Button, Field, Input, RadioGroup, Switch, Textarea } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/Form',
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '受控输入、开关和单选共同参与原生表单提交与重置。' },
    },
  },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Submission: Story = {
  render: function Submission() {
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [enabled, setEnabled] = useState(true)
    const [frequency, setFrequency] = useState<string | null>('daily')
    const [submitted, setSubmitted] = useState('尚未读取')
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>
          点击标签聚焦输入；Tab + 空格操作开关，方向键切换单选并跳过禁用项。读取表单仅展示本地数据。
        </p>
        <form
          className={css({ display: 'grid', gap: '5', maxWidth: 'xl' })}
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))))
          }}
          onReset={() => {
            setTitle('')
            setNote('')
            setEnabled(true)
            setFrequency('daily')
            setSubmitted('已重置')
          }}>
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
          <Switch.Root
            name="notifications"
            value="enabled"
            checked={enabled}
            onCheckedChange={(details) => setEnabled(details.checked)}>
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label>启用通知</Switch.Label>
          </Switch.Root>
          <RadioGroup.Root
            name="frequency"
            value={frequency}
            onValueChange={(details) => setFrequency(details.value)}
            size="md">
            <RadioGroup.Label>通知频率</RadioGroup.Label>
            <RadioGroup.Item value="immediate">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>立即通知</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="disabled" disabled>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>禁用选项</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="daily">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>每日摘要</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
          <div className={css({ display: 'flex', gap: '3', flexWrap: 'wrap' })}>
            <Button type="submit">读取表单</Button>
            <Button type="reset" variant="outline">
              重置
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEnabled(false)
                setFrequency('immediate')
              }}>
              外部关闭通知并切到立即通知
            </Button>
          </div>
          <p role="status">
            通知：{enabled ? '开启' : '关闭'}；频率：{frequency || '未选'}；表单：{submitted}
          </p>
        </form>
      </div>
    )
  },
}
