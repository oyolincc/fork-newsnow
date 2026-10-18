import { fn } from 'storybook/test'
import { Button, SegmentGroup } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/SegmentGroup',
  component: SegmentGroup.Root,
  args: { fitted: false, size: 'md', disabled: false, onValueChange: fn() },
  argTypes: {
    fitted: { control: 'boolean' },
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    disabled: { control: 'boolean' },
    onValueChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '分段单选、禁用项及水平与垂直布局。' },
    },
  },
} satisfies Meta<typeof SegmentGroup.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['fitted', 'size', 'disabled'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <SegmentGroup.Root {...args} defaultValue="week">
        <SegmentGroup.Label className={css({ srOnly: true })}>统计周期</SegmentGroup.Label>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          items={[
            { value: 'day', label: '每日' },
            { value: 'week', label: '每周' },
            { value: 'year', label: '每年（禁用）', disabled: true },
          ]}
        />
      </SegmentGroup.Root>
    </div>
  ),
}

export const ControlledForm: Story = {
  render: function ControlledForm() {
    const [period, setPeriod] = useState<string | null>('week')

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
            setPeriod('week')
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <div className={css({ display: 'grid', gap: '3' })}>
            <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>分段单选</h3>
            <SegmentGroup.Root
              name="period"
              value={period}
              onValueChange={({ value }) => setPeriod(value)}
              fitted>
              <SegmentGroup.Label className={css({ srOnly: true })}>统计周期</SegmentGroup.Label>
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={[
                  { value: 'day', label: '每日' },
                  { value: 'week', label: '每周' },
                  { value: 'month', label: '每月' },
                  { value: 'year', label: '每年（禁用）', disabled: true },
                ]}
              />
            </SegmentGroup.Root>
            <SegmentGroup.Root orientation="vertical" defaultValue="list" width="40" size="sm">
              <SegmentGroup.Label className={css({ srOnly: true })}>显示方式</SegmentGroup.Label>
              <SegmentGroup.Indicator />
              <SegmentGroup.Items items={['list', 'grid']} />
            </SegmentGroup.Root>
            <p role="status">周期：{period || '未选择'}</p>
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
export const CustomSize: Story = {
  render: function CustomSize() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <SegmentGroup.Root size="unstyled" name="custom-period" defaultValue="week" fitted>
          <SegmentGroup.Label className={css({ srOnly: true })}>自定分段尺寸</SegmentGroup.Label>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            h="56px"
            px="6"
            gap="4"
            textStyle="lg"
            items={[
              { value: 'day', label: '每日' },
              { value: 'week', label: '每周' },
            ]}
          />
        </SegmentGroup.Root>
      </div>
    )
  },
}
