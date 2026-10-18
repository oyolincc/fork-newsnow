import { Icon } from '@newsnow/ui'

import { css } from 'styled-system/css'
import { SearchIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Display/Icon',
  component: Icon,
  args: { size: 'md' },
  argTypes: {
    size: { control: 'select', options: ['2xs', 'lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
  },
  parameters: {
    controls: { disable: true },
    docs: { source: { type: 'code' }, description: { component: '图标组合、尺寸和颜色。' } },
  },
} satisfies Meta<typeof Icon>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Icon {...args} asChild>
        <SearchIcon />
      </Icon>
    </div>
  ),
}

export const CompositionAndSize: Story = {
  render: function CompositionAndSize() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Icon asChild size="lg" color="fg.muted">
          <SearchIcon aria-hidden="true" />
        </Icon>
        <span className={css({ display: 'inline-flex', alignItems: 'center', gap: '2' })}>
          <Icon asChild size="unstyled" width="18px" height="18px" color="lime.11">
            <SearchIcon />
          </Icon>
          自定图标尺寸
        </span>
      </div>
    )
  },
}
