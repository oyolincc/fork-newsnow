import { Alert, Heading } from '@newsnow/ui'

import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Alert',
  component: Alert.Root,
  args: { size: 'md', status: 'info', variant: 'subtle' },
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'unstyled'] },
    status: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    variant: { control: 'select', options: ['outline', 'solid', 'subtle', 'surface', 'unstyled'] },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '信息、成功、警告和错误状态及配方对比。' },
    },
  },
} satisfies Meta<typeof Alert.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'status', 'variant'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Alert.Root {...args}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>状态提示</Alert.Title>
          <Alert.Description>通过 Controls 切换状态与外观。</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    </div>
  ),
}

export const StatusesAndVariants: Story = {
  render: function StatusesAndVariants() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3', maxWidth: '2xl' })}>
          <Heading as="h3" textStyle="lg">
            提示状态与配方
          </Heading>
          <Alert.Root status="info" variant="subtle">
            <Alert.Indicator aria-hidden="true" />
            <Alert.Content>
              <Alert.Title>信息提示</Alert.Title>
              <Alert.Description>默认图标与柔和背景。</Alert.Description>
            </Alert.Content>
          </Alert.Root>
          <Alert.Root status="success" variant="surface">
            <Alert.Indicator aria-hidden="true">✓</Alert.Indicator>
            <Alert.Content>
              <Alert.Title>操作成功</Alert.Title>
              <Alert.Description>自定义指示图标。</Alert.Description>
            </Alert.Content>
          </Alert.Root>
          <Alert.Root status="warning" variant="outline">
            <Alert.Indicator asChild>
              <span aria-hidden="true">!</span>
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Title>请注意</Alert.Title>
              <Alert.Description>asChild 应复用提供的 span。</Alert.Description>
            </Alert.Content>
          </Alert.Root>
          <Alert.Root status="error" variant="solid" size="lg">
            <Alert.Indicator aria-hidden="true" />
            <Alert.Content>
              <Alert.Title>错误提示</Alert.Title>
              <Alert.Description>通过文字明确状态，不只依赖颜色。</Alert.Description>
            </Alert.Content>
          </Alert.Root>
          <Alert.Root status="success">
            <Alert.Indicator aria-hidden="true" />
            <Alert.Title>成功状态默认使用勾选图标</Alert.Title>
          </Alert.Root>
          <Alert.Root status="warning">
            <Alert.Indicator aria-hidden="true" />
            <Alert.Title>警告状态默认使用警告图标</Alert.Title>
          </Alert.Root>
        </div>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Alert.Root size="unstyled" status="success" p="3" gap="2" textStyle="sm">
          <Alert.Indicator css={{ _icon: { width: '18px', height: '18px' } }} />
          <Alert.Content gap="1">
            <Alert.Title>自定尺寸</Alert.Title>
            <Alert.Description>保留默认外观与成功状态。</Alert.Description>
          </Alert.Content>
        </Alert.Root>
        <Alert.Root
          variant="unstyled"
          status="success"
          bg="gray.3"
          borderRadius="lg"
          borderInlineStart="3px solid"
          borderColor="lime.9">
          <Alert.Indicator color="lime.11" />
          <Alert.Content>
            <Alert.Title fontWeight="bold">自定外观</Alert.Title>
            <Alert.Description>保留 md 尺寸及状态图标。</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </div>
    )
  },
}
