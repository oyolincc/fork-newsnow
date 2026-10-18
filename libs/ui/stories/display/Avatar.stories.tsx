import { Avatar, Heading, Text } from '@newsnow/ui'

import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Display/Avatar',
  component: Avatar.Root,
  args: { shape: 'full', size: 'md', variant: 'subtle' },
  argTypes: {
    shape: { control: 'select', options: ['full', 'rounded', 'square', 'unstyled'] },
    size: {
      control: 'select',
      options: ['2xl', '2xs', 'full', 'lg', 'md', 'sm', 'unstyled', 'xl', 'xs'],
    },
    variant: { control: 'select', options: ['outline', 'solid', 'subtle', 'surface', 'unstyled'] },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '图片、姓名缩写、回退内容和形状定制。' },
    },
  },
} satisfies Meta<typeof Avatar.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['shape', 'size', 'variant'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Avatar.Root {...args}>
        <Avatar.Fallback name="News Now" />
      </Avatar.Root>
    </div>
  ),
}

export const FallbacksAndImage: Story = {
  render: function FallbacksAndImage() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3' })}>
          <Heading as="h3" textStyle="lg">
            头像与回退
          </Heading>
          <div
            className={css({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4' })}>
            <Avatar.Root size="sm" variant="solid">
              <Avatar.Fallback name="Park UI" />
            </Avatar.Root>
            <Avatar.Root size="md" variant="surface" shape="rounded">
              <Avatar.Fallback name="  News   Now  " />
            </Avatar.Root>
            <Avatar.Root size="lg" variant="outline" shape="square">
              <Avatar.Fallback />
            </Avatar.Root>
            <Avatar.Root shape="full" size="lg">
              <Avatar.Fallback name="Random User" />
              <Avatar.Image src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2296%22%20height%3D%2296%22%20viewBox%3D%220%200%2096%2096%22%3E%3Crect%20width%3D%2296%22%20height%3D%2296%22%20fill%3D%22%233b82f6%22%2F%3E%3Ccircle%20cx%3D%2248%22%20cy%3D%2236%22%20r%3D%2218%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M12%2096a36%2036%200%200%201%2072%200%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E" />
            </Avatar.Root>
            <Avatar.Root size="xl">
              <Avatar.Fallback asChild>
                <span>自定义</span>
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
          <Text color="fg.muted">
            支持姓名缩写、默认图标、自定义节点和本地图片，不请求外部头像服务。
          </Text>
        </div>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '3', flexWrap: 'wrap' })}>
          <Avatar.Root
            size="unstyled"
            width="36px"
            height="36px"
            fontSize="14px"
            aria-label="自定尺寸头像">
            <Avatar.Fallback name="News Now" lineHeight="1" css={{ _icon: { boxSize: '4' } }} />
          </Avatar.Root>
          <Avatar.Root
            variant="unstyled"
            bg="lime.3"
            color="lime.11"
            fontWeight="bold"
            aria-label="自定外观头像">
            <Avatar.Fallback name="Ada Lovelace" />
          </Avatar.Root>
          <Avatar.Root shape="unstyled" borderRadius="10px" aria-label="自定形状头像">
            <Avatar.Fallback name="Park UI" borderRadius="inherit" />
          </Avatar.Root>
        </div>
      </div>
    )
  },
}
