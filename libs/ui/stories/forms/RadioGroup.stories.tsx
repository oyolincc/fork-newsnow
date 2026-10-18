import { Button, RadioGroup } from '@newsnow/ui'
import { useState, useRef } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '键盘单选、禁用项跳过和指示器兼容用法。' },
    },
  },
} satisfies Meta<typeof RadioGroup.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Controlled: Story = {
  render: function Controlled() {
    const [frequency, setFrequency] = useState<string | null>('daily')

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
            setFrequency('daily')
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
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
          <RadioGroup.Root size="unstyled" name="custom-radio" defaultValue="daily" gap="4">
            <RadioGroup.Label>自定单选尺寸，方向键切换</RadioGroup.Label>
            {['daily', 'weekly'].map((value) => (
              <RadioGroup.Item key={value} value={value} gap="4">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator boxSize="32px" _after={{ boxSize: '12px' }} />
                <RadioGroup.ItemText textStyle="lg">
                  {value === 'daily' ? '每日' : '每周'}
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
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
export const IndicatorCompatibility: Story = {
  render: function IndicatorCompatibility() {
    const indicatorRef = useRef<HTMLSpanElement>(null)
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <RadioGroup.Root defaultValue="new" size="sm">
          <RadioGroup.Label>普通 Radio：新增 ItemIndicator，保留 ItemControl</RadioGroup.Label>
          <RadioGroup.Item value="new">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator ref={indicatorRef} />
            <RadioGroup.ItemText>Chakra 风格 ItemIndicator</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="existing">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>已有 ItemControl 用法</RadioGroup.ItemText>
          </RadioGroup.Item>
        </RadioGroup.Root>
      </div>
    )
  },
}
