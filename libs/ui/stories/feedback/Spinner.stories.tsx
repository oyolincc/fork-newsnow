import { Spinner } from '@newsnow/ui'

import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  args: { size: 'md' },
  argTypes: {
    size: { control: 'select', options: ['2xl', 'inherit', 'lg', 'md', 'sm', 'xl', 'xs'] },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '加载指示器的尺寸与可访问文本。' },
    },
  },
} satisfies Meta<typeof Spinner>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Spinner {...args} aria-label="加载中" role="status" />
    </div>
  ),
}

export const Sizes: Story = {
  tags: ['!dev'],
  render: function Sizes() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <span className={css({ display: 'inline-flex', alignItems: 'center', gap: '2' })}>
          <Spinner size="sm" aria-hidden="true" />
          加载中
        </span>
        <Spinner size="lg" aria-label="加载中" role="status" />
      </div>
    )
  },
}
