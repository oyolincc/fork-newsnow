import { Badge, Button, Card } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Display/Card',
  component: Card.Root,
  args: { variant: 'outline' },
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outline', 'subtle', 'unstyled'] },
  },
  parameters: {
    controls: { disable: true },
    docs: { source: { type: 'code' }, description: { component: '卡片插槽、外观与操作反馈。' } },
  },
} satisfies Meta<typeof Card.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['variant'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Card.Root {...args}>
        <Card.Header>
          <Card.Title>卡片标题</Card.Title>
          <Card.Description>卡片描述</Card.Description>
        </Card.Header>
        <Card.Body>内容区域</Card.Body>
        <Card.Footer>
          <Button>操作</Button>
        </Card.Footer>
      </Card.Root>
    </div>
  ),
}

export const Variants: Story = {
  tags: ['!dev'],
  render: function Variants() {
    const [actions, setActions] = useState(0)
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div
          className={css({
            display: 'grid',
            gap: '4',
            gridTemplateColumns: { base: '1fr', lg: 'repeat(3, minmax(0, 1fr))' },
          })}>
          <Card.Root variant="outline">
            <Card.Header>
              <Card.Title asChild>
                <h3>Outline 卡片</h3>
              </Card.Title>
              <Card.Description>默认配方：边框与背景。</Card.Description>
            </Card.Header>
            <Card.Body>Header、Body 和 Footer 应保持一致的内边距。</Card.Body>
            <Card.Footer>
              <Button
                type="button"
                variant="outline"
                onClick={() => setActions((count) => count + 1)}>
                操作
              </Button>
            </Card.Footer>
          </Card.Root>
          <Card.Root variant="elevated">
            <Card.Header>
              <Card.Title>Elevated 卡片</Card.Title>
              <Card.Description>阴影配方。</Card.Description>
            </Card.Header>
            <Card.Body>卡片内容通过插槽组合，支持 css 和原生属性。</Card.Body>
            <Card.Footer>
              <Button type="button" onClick={() => setActions((count) => count + 1)}>
                操作
              </Button>
            </Card.Footer>
          </Card.Root>
          <Card.Root variant="subtle">
            <Card.Header>
              <Card.Title>Subtle 卡片</Card.Title>
              <Card.Description>柔和背景配方。</Card.Description>
            </Card.Header>
            <Card.Body>Footer 使用 div，不应被识别为额外标题。</Card.Body>
            <Card.Footer>
              <Badge>仅供展示</Badge>
            </Card.Footer>
          </Card.Root>
        </div>
        <p role="status">卡片操作执行 {actions} 次。</p>
      </div>
    )
  },
}
export const CustomAppearance: Story = {
  render: function CustomAppearance() {
    const [, setActions] = useState(0)
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Card.Root variant="unstyled" bg="gray.3" borderRadius="lg">
          <Card.Header>
            <Card.Title fontWeight="bold">自定外观，保留卡片间距</Card.Title>
            <Card.Description color="gray.11">
              单档尺寸继续保留，不需要重新设置全部 slots。
            </Card.Description>
          </Card.Header>
          <Card.Body>背景、圆角、标题字重与描述颜色由当前实例定义。</Card.Body>
          <Card.Footer>
            <Button type="button" size="sm" onClick={() => setActions((count) => count + 1)}>
              操作
            </Button>
          </Card.Footer>
        </Card.Root>
      </div>
    )
  },
}
