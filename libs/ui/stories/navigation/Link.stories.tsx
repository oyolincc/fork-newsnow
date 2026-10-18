import { Link } from '@newsnow/ui'
import { useId } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Link',
  component: Link,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '链接外观、asChild 和键盘焦点。' },
    },
  },
} satisfies Meta<typeof Link>
export default meta
type Story = StoryObj<typeof meta>
export const Variants: Story = {
  tags: ['!dev'],
  render: function Variants() {
    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p id={`${storyId}-feedback-heading`}>链接目标</p>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '4' })}>
          <Link href={`#${storyId}-feedback-heading`}>Underline 链接</Link>
          <Link variant="plain" href={`#${storyId}-feedback-heading`}>
            Plain 链接
          </Link>
          <Link asChild>
            <a href={`#${storyId}-feedback-heading`}>asChild 链接</a>
          </Link>
        </div>
      </div>
    )
  },
}
export const CustomAppearance: Story = {
  render: function CustomAppearance() {
    const storyId = useId()
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p id={`${storyId}-feedback-heading`}>链接目标</p>
        <Link
          variant="unstyled"
          href={`#${storyId}-feedback-heading`}
          alignSelf="start"
          bg="gray.3"
          color="lime.11"
          borderRadius="md"
          px="2"
          py="1"
          focusVisibleRing="outside"
          css={{ _hover: { bg: 'lime.3' } }}>
          自定外观的链接，保留导航行为
        </Link>
      </div>
    )
  },
}
