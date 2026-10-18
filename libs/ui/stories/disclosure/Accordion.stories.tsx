import { Accordion, Button } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Disclosure/Accordion',
  component: Accordion.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '多项受控展开、禁用项与外观定制。' },
    },
  },
} satisfies Meta<typeof Accordion.Root>
export default meta
type Story = StoryObj<typeof meta>
export const ControlledMultiple: Story = {
  render: function ControlledMultiple() {
    const [expanded, setExpanded] = useState(['intro'])

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>Accordion 支持多项展开；方向键移动焦点并跳过禁用项，Enter/空格切换展开状态。</p>
        <Accordion.Root
          multiple
          collapsible
          value={expanded}
          onValueChange={(details) => setExpanded(details.value)}
          maxWidth="xl">
          <Accordion.Item value="intro">
            <h3>
              <Accordion.ItemTrigger>
                组件说明
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h3>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                默认 outline 配方，内容展开时应有高度动画，箭头随状态旋转。
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item value="disabled" disabled>
            <h3>
              <Accordion.ItemTrigger>
                禁用项目
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h3>
            <Accordion.ItemContent>
              <Accordion.ItemBody>该项目不可展开。</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item value="details">
            <h3>
              <Accordion.ItemTrigger>
                更多详情
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h3>
            <Accordion.ItemContent>
              <Accordion.ItemBody>此项可以与第一项同时展开，也可以单独收起。</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
        <div className={css({ display: 'flex', gap: '3', flexWrap: 'wrap' })}>
          <Button type="button" variant="outline" onClick={() => setExpanded(['intro', 'details'])}>
            外部展开全部可用项目
          </Button>
          <Button type="button" variant="outline" onClick={() => setExpanded([])}>
            外部收起全部
          </Button>
        </div>
        <p role="status">展开项目：{expanded.join('、') || '无'}</p>
      </div>
    )
  },
}
export const CustomAppearance: Story = {
  render: function CustomAppearance() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>自定外观保留默认尺寸与展开行为；系统开启减少动态效果时，内容直接展开／收起。</p>
        <Accordion.Root variant="unstyled" collapsible maxWidth="xl">
          <Accordion.Item value="custom" borderBottomWidth="1px" borderColor="lime.6">
            <h3>
              <Accordion.ItemTrigger color="lime.11" fontWeight="medium" focusVisibleRing="outside">
                自定外观
                <Accordion.ItemIndicator color="lime.10" />
              </Accordion.ItemTrigger>
            </h3>
            <Accordion.ItemContent>
              <Accordion.ItemBody color="gray.fg.muted">
                内容与指示器仍跟随展开状态。
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    )
  },
}
