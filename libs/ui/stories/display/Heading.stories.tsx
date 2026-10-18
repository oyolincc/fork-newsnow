import { Heading } from '@newsnow/ui'

import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Display/Heading',
  component: Heading,
  args: { size: 'xl', children: '组件标题' },
  argTypes: {
    size: {
      control: 'select',
      options: ['2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'lg', 'md', 'sm', 'unstyled', 'xl', 'xs'],
    },
    children: { control: 'text' },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: 'HTML 标题层级、字号和样式覆盖。' },
    },
  },
} satisfies Meta<typeof Heading>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'children'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Heading {...args} />
    </div>
  ),
}

export const LevelsAndSizes: Story = {
  render: function LevelsAndSizes() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3' })}>
          <Heading as="h3" size="lg">
            标题 size 与 HTML 层级分别控制
          </Heading>
          <Heading as="h4" size="sm">
            sm 标题
          </Heading>
          <Heading as="h4" size="lg" textStyle="sm">
            textStyle 可以覆盖 size 的文字样式
          </Heading>
        </div>
        <Heading as="h3">默认标题 · xl</Heading>
        <Heading as="h4" size="unstyled" fontSize="17px" lineHeight="1.5">
          自定字号，保留默认字重
        </Heading>
      </div>
    )
  },
}
