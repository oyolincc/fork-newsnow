import { Grid, GridItem, Heading, Stack, Text } from '@newsnow/ui'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '响应式网格、跨列、自动适应与 asChild。' },
    },
  },
} satisfies Meta<typeof Grid>
export default meta
type Story = StoryObj<typeof meta>
export const ResponsiveAndAsChild: Story = {
  render: function ResponsiveAndAsChild() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Stack gap="4">
          <Heading as="h3" size="lg">
            Grid / GridItem 与 grid pattern
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, minmax(0, 1fr))' }} gap="3">
            <GridItem colSpan={{ base: 1, md: 2 }} p="4" bg="gray.surface.bg" borderRadius="sm">
              跨两列主内容
            </GridItem>
            <GridItem p="4" bg="gray.subtle.bg" borderRadius="sm">
              侧栏
            </GridItem>
          </Grid>
          <div className={grid({ columns: { base: 1, sm: 2, lg: 3 }, gap: '3' })}>
            {['响应式列 A', '响应式列 B', '响应式列 C'].map((label) => (
              <div key={label} className={css({ p: '4', borderWidth: '1px' })}>
                {label}
              </div>
            ))}
          </div>
          <div className={grid({ minChildWidth: '180px', gap: '3' })}>
            {['自动适应 A', '自动适应 B', '自动适应 C'].map((label) => (
              <div key={label} className={css({ p: '4', bg: 'gray.subtle.bg' })}>
                {label}
              </div>
            ))}
          </div>
          <Grid asChild columns={2} gap="3">
            <article aria-label="asChild 网格示例">
              <Text>asChild 复用 article</Text>
              <Text>无额外容器</Text>
            </article>
          </Grid>
        </Stack>
      </div>
    )
  },
}
