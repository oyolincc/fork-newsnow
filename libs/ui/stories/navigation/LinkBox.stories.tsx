import { Heading, Link, LinkBox, LinkOverlay, Stack, Text } from '@newsnow/ui'
import { css } from 'styled-system/css'

import { useId } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/LinkBox',
  component: LinkBox,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '整卡链接与独立次级链接。' },
    },
  },
} satisfies Meta<typeof LinkBox>
export default meta
type Story = StoryObj<typeof meta>
export const OverlayAndSecondaryLink: Story = {
  render: function OverlayAndSecondaryLink() {
    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Stack gap="4">
          <Heading as="h3" size="lg">
            整卡链接
          </Heading>
          <LinkBox as="article" p="6" borderWidth="1px" borderRadius="sm">
            <Heading as="h3" size="md">
              <LinkOverlay href={`#${storyId}-layout-link-target`}>
                点击整张卡片跳至页尾
              </LinkOverlay>
            </Heading>
            <Text my="3">标题链接覆盖卡片，次级链接保留独立交互。</Text>
            <Link href={`#${storyId}-layout-secondary-target`}>独立的次级链接</Link>
          </LinkBox>
          <Text id={`${storyId}-layout-link-target`}>卡片链接目标</Text>
          <Text id={`${storyId}-layout-secondary-target`}>次级链接目标</Text>
        </Stack>
      </div>
    )
  },
}
