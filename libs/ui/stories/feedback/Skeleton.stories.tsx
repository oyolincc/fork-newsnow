import { Button, Skeleton, SkeletonCircle, SkeletonText } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  args: { loading: true, variant: 'pulse' },
  argTypes: {
    circle: { control: 'boolean' },
    loading: { control: 'boolean' },
    variant: { control: 'select', options: ['none', 'pulse', 'shine'] },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '占位动画、圆形与多行占位和内容切换。' },
    },
  },
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['circle', 'loading', 'variant'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Skeleton {...args} p="4" minHeight="20">
        加载完成后的内容
      </Skeleton>
    </div>
  ),
}

export const LoadingAndContent: Story = {
  render: function LoadingAndContent() {
    const [loading, setLoading] = useState(true)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '4', maxWidth: 'xl' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
            Skeleton 占位与内容切换
          </h3>
          <div
            className={css({ display: 'flex', alignItems: 'center', gap: '4' })}
            aria-hidden="true">
            <SkeletonCircle boxSize="12" />
            <SkeletonText noOfLines={3} rootProps={{ flex: '1' }} />
          </div>
          <div className={css({ display: 'grid', gap: '3' })} aria-hidden="true">
            <Skeleton variant="pulse" height="8" />
            <Skeleton variant="shine" height="8" />
            <Skeleton variant="none" height="8" bg="gray.subtle.bg.active" />
          </div>
          <Button type="button" variant="outline" onClick={() => setLoading((value) => !value)}>
            {loading ? '显示内容' : '恢复加载占位'}
          </Button>
          <div aria-busy={loading}>
            <Skeleton loading={loading} aria-hidden={loading} padding="4" minHeight="20">
              <p>加载完成后的真实内容。</p>
              <p>关闭 loading 后应恢复文字可见性，并退出占位动画。</p>
            </Skeleton>
          </div>
          <p role="status">当前状态：{loading ? '加载中' : '内容已显示'}</p>
        </div>
      </div>
    )
  },
}
