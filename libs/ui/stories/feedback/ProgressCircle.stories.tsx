import { Button, ProgressCircle, Text, useProgress } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/ProgressCircle',
  component: ProgressCircle.Root,
  args: { size: 'md', variant: 'solid', value: 40 },
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    variant: { control: 'select', options: ['solid', 'subtle', 'unstyled'] },
    value: { control: 'number' },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '圆形进度、居中数值、未定状态和外部 store。' },
    },
  },
} satisfies Meta<typeof ProgressCircle.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'variant', 'value'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <ProgressCircle.Root {...args}>
        <ProgressCircle.Label>圆形进度</ProgressCircle.Label>
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range />
        </ProgressCircle.Circle>
        <ProgressCircle.ValueText />
      </ProgressCircle.Root>
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
        <ProgressCircle.Root value={indeterminate ? null : value} size="xl">
          <ProgressCircle.Label>圆形任务进度</ProgressCircle.Label>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3', mt: '2' })}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <ProgressCircle.ValueText />
          </div>
        </ProgressCircle.Root>
        <Text role="status">{indeterminate ? '未定进度' : `当前进度 ${value}%`}</Text>
      </div>
    )
  },
}
export const Store: Story = {
  render: function Store() {
    const progress = useProgress({ defaultValue: 25 })
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <ProgressCircle.RootProvider value={progress} size="xl" variant="subtle">
          <ProgressCircle.Label>独立 store 与居中数值</ProgressCircle.Label>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3', mt: '2' })}>
            <div className={css({ position: 'relative', display: 'inline-flex' })}>
              <ProgressCircle.Circle css={{ '--thickness': '5px' }}>
                <ProgressCircle.Track />
                <ProgressCircle.Range strokeLinecap="round" />
              </ProgressCircle.Circle>
              <div
                className={css({
                  position: 'absolute',
                  inset: '0',
                  display: 'grid',
                  placeItems: 'center',
                })}>
                <ProgressCircle.ValueText />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                progress.setValue(progress.value === 100 ? 0 : (progress.value || 0) + 25)
              }>
              {progress.value === 100 ? '重置 store' : 'store 增加 25%'}
            </Button>
          </div>
        </ProgressCircle.RootProvider>
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
        <div className={css({ display: 'flex', alignItems: 'start', gap: '6', flexWrap: 'wrap' })}>
          <ProgressCircle.Root size="unstyled" value={indeterminate ? null : value} textStyle="sm">
            <ProgressCircle.Label gap="1">自定圆环尺寸</ProgressCircle.Label>
            <ProgressCircle.Circle css={{ '--size': '32px', '--thickness': '3px' }}>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <ProgressCircle.ValueText textStyle="xs" lineHeight="1" />
          </ProgressCircle.Root>
          <ProgressCircle.Root variant="unstyled" value={indeterminate ? null : value}>
            <ProgressCircle.Label>自定圆环配色</ProgressCircle.Label>
            <ProgressCircle.Circle>
              <ProgressCircle.Track stroke="gray.4" />
              <ProgressCircle.Range stroke="lime.9" strokeLinecap="round" />
            </ProgressCircle.Circle>
            <ProgressCircle.ValueText />
          </ProgressCircle.Root>
        </div>
      </div>
    )
  },
}
