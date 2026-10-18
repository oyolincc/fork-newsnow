import { Badge } from '@newsnow/ui'

import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Display/Badge',
  component: Badge,
  args: { size: 'md', variant: 'subtle', children: '标签' },
  argTypes: {
    size: { control: 'select', options: ['2xl', 'lg', 'md', 'sm', 'unstyled', 'xl'] },
    variant: { control: 'select', options: ['outline', 'solid', 'subtle', 'surface', 'unstyled'] },
    children: { control: 'text' },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '标签的配色、外观、尺寸和 asChild。' },
    },
  },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'variant', 'children'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Badge {...args} />
    </div>
  ),
}

export const Variants: Story = {
  tags: ['!dev'],
  render: function Variants() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'grid', gap: '3' })}>
          <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>Badge 配方与尺寸</h3>
          <div
            className={css({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '3' })}>
            <Badge variant="solid">Solid</Badge>
            <Badge variant="surface">Surface</Badge>
            <Badge variant="subtle">Subtle</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge colorPalette="red">错误</Badge>
            <Badge colorPalette="green">成功</Badge>
            <Badge colorPalette="gray" asChild>
              <span>asChild：span</span>
            </Badge>
          </div>
          <div
            className={css({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '3' })}>
            <Badge size="sm">sm</Badge>
            <Badge size="md">md</Badge>
            <Badge size="lg">lg</Badge>
            <Badge size="xl">xl</Badge>
            <Badge size="2xl">2xl</Badge>
          </div>
        </div>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={css({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '3' })}>
          <Badge size="unstyled" height="22px" px="2" gap="1" fontSize="12px" lineHeight="1">
            自定尺寸
          </Badge>
          <Badge
            variant="unstyled"
            bg="lime.3"
            color="lime.11"
            borderRadius="full"
            fontWeight="semibold">
            自定外观
          </Badge>
        </div>
      </div>
    )
  },
}
