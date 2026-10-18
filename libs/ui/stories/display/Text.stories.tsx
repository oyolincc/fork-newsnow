import { Text } from '@newsnow/ui'

import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Display/Text',
  component: Text,
  parameters: {
    controls: { disable: true },
    docs: { source: { type: 'code' }, description: { component: '文本样式与多行截断。' } },
  },
} satisfies Meta<typeof Text>
export default meta
type Story = StoryObj<typeof meta>
export const Truncation: Story = {
  render: function Truncation() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Text textStyle="lg">
          Text 继承主题文本样式，Heading 默认使用 h2，可按标题层级修改 as。
        </Text>
        <Text color="fg.muted" lineClamp={2}>
          这是一段用于展示两行截断的较长文字。基础排版支持 Panda
          的样式属性和原生属性，应用可直接使用主题
          token；组件库保留配方源码以便后续调整。重复内容让示例覆盖多行文本截断。
        </Text>
      </div>
    )
  },
}
