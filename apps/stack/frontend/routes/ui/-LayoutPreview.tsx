import {
  Badge,
  Button,
  Float,
  Grid,
  GridItem,
  Group,
  Heading,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Separator,
  Stack,
  Text,
  VisuallyHidden,
  VStack,
} from '@newsnow/ui'
import { css } from 'styled-system/css'
import { grid, hstack, vstack } from 'styled-system/patterns'

export function LayoutPreview() {
  return (
    <section className={css({ maxWidth: '6xl', mx: 'auto', p: { base: '6', md: '8' } })}>
      <Stack gap="8">
        <Heading size="2xl">布局与组合 API</Heading>
        <Text>
          简单布局优先使用 Panda patterns；Grid / GridItem 和带分隔符的 Stack 保留组件入口。
        </Text>

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

        <Stack gap="4">
          <Heading as="h3" size="lg">
            整卡链接
          </Heading>
          <LinkBox as="article" p="6" borderWidth="1px" borderRadius="sm">
            <Heading as="h3" size="md">
              <LinkOverlay href="#layout-link-target">点击整张卡片跳至页尾</LinkOverlay>
            </Heading>
            <Text my="3">标题链接覆盖卡片，次级链接保留独立交互。</Text>
            <Link href="#layout-secondary-target">独立的次级链接</Link>
          </LinkBox>
          <Text id="layout-link-target">卡片链接目标</Text>
          <Text id="layout-secondary-target">次级链接目标</Text>
        </Stack>
      </Stack>
    </section>
  )
}
