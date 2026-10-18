import { Avatar, Button, Heading, Tag } from '@newsnow/ui'
import { useState } from 'react'
import { hstack } from 'styled-system/patterns'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Display/Tag',
  component: Tag.Root,
  args: { size: 'md', variant: 'surface' },
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled', 'xl'] },
    variant: { control: 'select', options: ['outline', 'solid', 'subtle', 'surface', 'unstyled'] },
  },
  parameters: {
    controls: { disable: true },
    docs: { source: { type: 'code' }, description: { component: '标签外观、插槽、关闭和恢复。' } },
  },
} satisfies Meta<typeof Tag.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'variant'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Tag.Root {...args}>
        <Tag.Label>技术标签</Tag.Label>
      </Tag.Root>
    </div>
  ),
}

export const Variants: Story = {
  tags: ['!dev'],
  render: function Variants() {
    const [, setTags] = useState(['Panda CSS', 'Ark UI', 'Park UI'])

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          Tag 配方、尺寸与插槽
        </Heading>
        <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
          <Tag.Root size="sm" variant="subtle">
            <Tag.Label>Small</Tag.Label>
          </Tag.Root>
          <Tag.Root size="md" variant="surface">
            <Tag.Label>Medium</Tag.Label>
          </Tag.Root>
          <Tag.Root size="lg" variant="outline">
            <Tag.Label>Large</Tag.Label>
          </Tag.Root>
          <Tag.Root size="xl" variant="solid">
            <Tag.Label>Extra large</Tag.Label>
          </Tag.Root>
          <Tag.Root size="lg" colorPalette="green">
            <Tag.StartElement>
              <Avatar.Root size="full">
                <Avatar.Fallback name="Ada" />
              </Avatar.Root>
            </Tag.StartElement>
            <Tag.Label>Ada</Tag.Label>
          </Tag.Root>
          <Tag.Root maxWidth="40">
            <Tag.Label>这是一段需要截断的较长标签文本</Tag.Label>
          </Tag.Root>
          <Tag.Root asChild variant="outline">
            <button type="button" onClick={() => setTags(['Panda CSS', 'Ark UI', 'Park UI'])}>
              <Tag.Label>重置标签</Tag.Label>
            </button>
          </Tag.Root>
        </div>
      </div>
    )
  },
}
export const Closable: Story = {
  render: function Closable() {
    const [tags, setTags] = useState(['Panda CSS', 'Ark UI', 'Park UI'])

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
          {tags.map((label) => (
            <Tag.Root key={label}>
              <Tag.Label>{label}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger
                  aria-label={`移除 ${label}`}
                  onClick={() => setTags((current) => current.filter((value) => value !== label))}
                />
              </Tag.EndElement>
            </Tag.Root>
          ))}
          <Tag.Root variant="outline">
            <Tag.Label>自定义关闭内容</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger aria-label="禁用的关闭按钮" disabled>
                ×
              </Tag.CloseTrigger>
            </Tag.EndElement>
          </Tag.Root>
        </div>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    const [customTagVisible, setCustomTagVisible] = useState(true)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          Tag · 分维度定制
        </Heading>
        <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
          {customTagVisible && (
            <Tag.Root size="unstyled" minHeight="26px" px="2" gap="1.5" lineHeight="1">
              <Tag.StartElement width="18px" height="18px">
                <Avatar.Root size="full">
                  <Avatar.Fallback name="Ada" />
                </Avatar.Root>
              </Tag.StartElement>
              <Tag.Label textStyle="xs">自定尺寸</Tag.Label>
              <Tag.EndElement width="14px" height="14px">
                <Tag.CloseTrigger
                  aria-label="移除自定尺寸标签"
                  onClick={() => setCustomTagVisible(false)}
                />
              </Tag.EndElement>
            </Tag.Root>
          )}
          {!customTagVisible && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setCustomTagVisible(true)}>
              恢复自定尺寸标签
            </Button>
          )}
          <Tag.Root
            variant="unstyled"
            bg="lime.3"
            color="lime.11"
            borderRadius="full"
            fontWeight="semibold">
            <Tag.Label>自定外观</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger
                borderRadius="full"
                focusVisibleRing="inside"
                aria-label="禁用的自定外观关闭按钮"
                disabled
                css={{ _disabled: { opacity: 0.5 } }}
              />
            </Tag.EndElement>
          </Tag.Root>
        </div>
      </div>
    )
  },
}
