import { Breadcrumb, Heading } from '@newsnow/ui'

import { css } from 'styled-system/css'
import { useId } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '链接组合、自定义分隔、省略和当前页。' },
    },
  },
} satisfies Meta<typeof Breadcrumb.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Composition: Story = {
  render: function Composition() {
    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Breadcrumb.Root aria-label="组件导航路径">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <a href={`#${storyId}-breadcrumb-target`}>UI 首页</a>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <a href={`#${storyId}-breadcrumb-target`}>表格与标签</a>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>折叠与导航</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <Breadcrumb.Root variant="underline" size="sm" aria-label="自定义分隔与省略路径">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href={`#${storyId}-breadcrumb-target`}>首页</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Ellipsis />
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>当前页面</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <div id={`${storyId}-breadcrumb-target`}>链接目标</div>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div id={`${storyId}-breadcrumb-target`}>链接目标</div>
        <Heading size="md">分维度定制</Heading>
        <Breadcrumb.Root size="unstyled" aria-label="自定尺寸路径">
          <Breadcrumb.List gap="1.5" textStyle="sm">
            <Breadcrumb.Item>
              <Breadcrumb.Link href={`#${storyId}-breadcrumb-target`} gap="1">
                首页
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>自定尺寸</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <Breadcrumb.Root variant="unstyled" aria-label="自定外观路径">
          <Breadcrumb.List>
            <Breadcrumb.Item color="lime.11">
              <Breadcrumb.Link
                href={`#${storyId}-breadcrumb-target`}
                focusRing="outside"
                css={{ _hover: { textDecoration: 'underline' } }}>
                首页
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator color="lime.7">/</Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink color="lime.11" fontWeight="semibold">
                自定外观
              </Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>
    )
  },
}
