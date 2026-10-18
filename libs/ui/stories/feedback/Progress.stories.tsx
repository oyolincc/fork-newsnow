import { Button, Progress, Text } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Progress',
  component: Progress.Root,
  args: {
    shape: 'rounded',
    size: 'md',
    variant: 'solid',
    value: 40,
    striped: false,
    animated: false,
  },
  argTypes: {
    animated: { control: 'boolean' },
    shape: { control: 'select', options: ['full', 'rounded', 'square', 'unstyled'] },
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    striped: { control: 'boolean' },
    variant: { control: 'select', options: ['solid', 'subtle', 'unstyled'] },
    value: { control: 'number' },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '确定与未定进度、条纹动画和轨道定制。' },
    },
  },
} satisfies Meta<typeof Progress.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: {
      disable: false,
      include: ['animated', 'shape', 'size', 'striped', 'variant', 'value'],
    },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Progress.Root {...args}>
        <Progress.Label>任务进度</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </div>
  ),
}

export const Controlled: Story = {
  render: function Controlled() {
    const [value, setValue] = useState(40)
    const [indeterminate, setIndeterminate] = useState(false)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
          <Button
            type="button"
            variant="outline"
            disabled={value === 0}
            onClick={() => setValue((current) => Math.max(0, current - 20))}>
            减少
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={value === 100}
            onClick={() => setValue((current) => Math.min(100, current + 20))}>
            增加
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIndeterminate((current) => !current)}>
            {indeterminate ? '使用确定值' : '使用未定进度'}
          </Button>
        </div>
        <Progress.Root value={indeterminate ? null : value} shape="full">
          <div className={css({ display: 'flex', justifyContent: 'space-between', mb: '2' })}>
            <Progress.Label>任务进度</Progress.Label>
            <Progress.ValueText />
          </div>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Progress.Root value={value} variant="subtle" striped animated size="lg">
          <Progress.Label>条纹进度</Progress.Label>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Text role="status">{indeterminate ? '未定进度' : `当前进度 ${value}%`}</Text>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    const [value, setValue] = useState(40)
    const [indeterminate, setIndeterminate] = useState(false)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
          <Button
            type="button"
            variant="outline"
            disabled={value === 0}
            onClick={() => setValue((current) => Math.max(0, current - 20))}>
            减少
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={value === 100}
            onClick={() => setValue((current) => Math.min(100, current + 20))}>
            增加
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIndeterminate((current) => !current)}>
            {indeterminate ? '使用确定值' : '使用未定进度'}
          </Button>
        </div>
        <Progress.Root size="unstyled" value={indeterminate ? null : value} textStyle="sm">
          <Progress.Label gap="1">自定轨道尺寸</Progress.Label>
          <Progress.ValueText textStyle="xs" lineHeight="1" />
          <Progress.Track height="6px">
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Progress.Root variant="unstyled" value={indeterminate ? null : value}>
          <Progress.Label>自定配色，保留 md 尺寸与未定动画</Progress.Label>
          <Progress.Track bg="gray.3">
            <Progress.Range bg="lime.9" />
          </Progress.Track>
        </Progress.Root>
        <Progress.Root shape="unstyled" size="sm" value={value}>
          <Progress.Label>自定轨道圆角</Progress.Label>
          <Progress.Track borderRadius="3px">
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Progress.Root value={indeterminate ? null : value} striped animated>
          <Progress.Label>默认条纹与未定状态组合对照</Progress.Label>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      </div>
    )
  },
}
