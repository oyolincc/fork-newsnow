import { Badge, Heading, Float, Stack, Text, VisuallyHidden } from '@newsnow/ui'

import { css } from 'styled-system/css'
import { grid, hstack } from 'styled-system/patterns'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Positioning',
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '原生 CSS 居中、比例容器和 Float 定位。' },
    },
  },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Centered: Story = {
  render: function Centered() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div
          className={css({
            position: 'relative',
            height: '24',
            borderWidth: '1px',
            borderRadius: 'sm',
          })}>
          <div
            className={css({
              position: 'absolute',
              inset: '0',
              display: 'grid',
              placeItems: 'center',
            })}>
            <Badge>原生元素居中</Badge>
          </div>
        </div>
      </div>
    )
  },
}
export const FloatAndAspectRatio: Story = {
  render: function FloatAndAspectRatio() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Stack gap="4">
          <Heading as="h3" size="lg">
            原生样式与 Float
          </Heading>
          <div className={hstack({ flexWrap: 'wrap', gap: '3', maxWidth: 'sm' })}>
            {['设计', '组件', 'Panda CSS', 'Ark UI', '响应式', '可定制'].map((label) => (
              <Badge key={label}>{label}</Badge>
            ))}
          </div>
          <div className={grid({ columns: { base: 1, md: 2 }, gap: '6' })}>
            <div
              className={css({
                aspectRatio: '16 / 9',
                display: 'grid',
                placeItems: 'center',
                bg: 'gray.subtle.bg',
                borderRadius: 'sm',
              })}>
              16:9 内容容器
            </div>
            <div
              className={css({
                position: 'relative',
                minHeight: '40',
                display: 'grid',
                placeItems: 'center',
                borderWidth: '1px',
                borderRadius: 'sm',
              })}>
              <Text>原生元素居中</Text>
              <Float placement="top-end" offset="2">
                <Badge variant="solid">
                  3<VisuallyHidden>条通知</VisuallyHidden>
                </Badge>
              </Float>
            </div>
          </div>
        </Stack>
      </div>
    )
  },
}
