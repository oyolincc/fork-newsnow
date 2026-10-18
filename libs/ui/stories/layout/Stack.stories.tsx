import { Badge, Button, Group, Heading, HStack, Separator, Stack, Text, VStack } from '@newsnow/ui'
import { css } from 'styled-system/css'
import { hstack, vstack } from 'styled-system/patterns'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '布局 patterns、组合、分隔符和响应式方向。' },
    },
  },
} satisfies Meta<typeof Stack>
export default meta
type Story = StoryObj<typeof meta>
export const PatternsAndGroup: Story = {
  render: function PatternsAndGroup() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={vstack({ alignItems: 'stretch', gap: '4' })}>
          <Heading as="h3" size="lg">
            Patterns 与组合
          </Heading>
          <div
            className={hstack({
              flexWrap: 'wrap',
              gap: '3',
              p: '4',
              bg: 'gray.subtle.bg',
              borderRadius: 'sm',
            })}>
            <Text fontWeight="semibold" flex="1">
              弹性工具栏
            </Text>
            <Group attached>
              <Button variant="outline">查看</Button>
              <Button variant="outline">编辑</Button>
            </Group>
          </div>
          <HStack gap="4">
            <Badge>HStack</Badge>
            <Text>默认水平居中对齐</Text>
          </HStack>
          <VStack align="stretch" gap="2">
            <Badge alignSelf="start">VStack</Badge>
            <Text>组件入口支持 asChild 和 separator；patterns 适合普通元素。</Text>
          </VStack>
        </div>
      </div>
    )
  },
}
export const ResponsiveSeparators: Story = {
  render: function ResponsiveSeparators() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Stack gap="4">
          <Heading as="h3" size="lg">
            响应式 Stack 与 Separator
          </Heading>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            gap="6"
            separator={<Separator variant="dashed" />}>
            <div className={css({ p: '3' })}>第一项</div>
            <div className={css({ p: '3' })}>第二项</div>
            <div className={css({ p: '3' })}>第三项</div>
          </Stack>
          <HStack gap={{ base: '2', md: '4' }} separator={<Separator size="md" />}>
            <Text>水平</Text>
            <Text>分隔</Text>
          </HStack>
          <Separator variant="dotted" size="lg" />
          <div className={hstack({ gap: '3', h: '10' })}>
            <Text>显式垂直分隔</Text>
            <Separator orientation="vertical" />
            <Text>另一侧</Text>
          </div>
        </Stack>
      </div>
    )
  },
}
