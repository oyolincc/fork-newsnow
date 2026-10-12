import { Badge, Button, Card, Skeleton, SkeletonCircle, SkeletonText } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

export function DisplayPreview() {
  const [loading, setLoading] = useState(true)
  const [actions, setActions] = useState(0)

  return (
    <section
      aria-labelledby="display-heading"
      className={css({ display: 'grid', gap: '6', padding: { base: '6', md: '10' } })}>
      <h2 id="display-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Badge、Card、Skeleton 验收
      </h2>
      <div className={css({ display: 'grid', gap: '3' })}>
        <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>Badge 配方与尺寸</h3>
        <div className={css({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '3' })}>
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
        <div className={css({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '3' })}>
          <Badge size="sm">sm</Badge>
          <Badge size="md">md</Badge>
          <Badge size="lg">lg</Badge>
          <Badge size="xl">xl</Badge>
          <Badge size="2xl">2xl</Badge>
        </div>
      </div>

      <div
        className={css({
          display: 'grid',
          gap: '4',
          gridTemplateColumns: { base: '1fr', lg: 'repeat(3, minmax(0, 1fr))' },
        })}>
        <Card.Root variant="outline">
          <Card.Header>
            <Card.Title asChild>
              <h3>Outline 卡片</h3>
            </Card.Title>
            <Card.Description>默认配方：边框与背景。</Card.Description>
          </Card.Header>
          <Card.Body>Header、Body 和 Footer 应保持一致的内边距。</Card.Body>
          <Card.Footer>
            <Button
              type="button"
              variant="outline"
              onClick={() => setActions((count) => count + 1)}>
              操作
            </Button>
          </Card.Footer>
        </Card.Root>
        <Card.Root variant="elevated">
          <Card.Header>
            <Card.Title>Elevated 卡片</Card.Title>
            <Card.Description>阴影配方。</Card.Description>
          </Card.Header>
          <Card.Body>卡片内容通过插槽组合，支持 css 和原生属性。</Card.Body>
          <Card.Footer>
            <Button type="button" onClick={() => setActions((count) => count + 1)}>
              操作
            </Button>
          </Card.Footer>
        </Card.Root>
        <Card.Root variant="subtle">
          <Card.Header>
            <Card.Title>Subtle 卡片</Card.Title>
            <Card.Description>柔和背景配方。</Card.Description>
          </Card.Header>
          <Card.Body>Footer 使用 div，不应被识别为额外标题。</Card.Body>
          <Card.Footer>
            <Badge>仅供展示</Badge>
          </Card.Footer>
        </Card.Root>
      </div>
      <p role="status">卡片操作执行 {actions} 次。</p>

      <div className={css({ display: 'grid', gap: '4', maxWidth: 'xl' })}>
        <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>
          Skeleton 占位与内容切换
        </h3>
        <div
          className={css({ display: 'flex', alignItems: 'center', gap: '4' })}
          aria-hidden="true">
          <SkeletonCircle boxSize="12" />
          <SkeletonText noOfLines={3} rootProps={{ flex: '1' }} />
        </div>
        <div className={css({ display: 'grid', gap: '3' })} aria-hidden="true">
          <Skeleton variant="pulse" height="8" />
          <Skeleton variant="shine" height="8" />
          <Skeleton variant="none" height="8" bg="gray.subtle.bg.active" />
        </div>
        <Button type="button" variant="outline" onClick={() => setLoading((value) => !value)}>
          {loading ? '显示内容' : '恢复加载占位'}
        </Button>
        <div aria-busy={loading}>
          <Skeleton loading={loading} aria-hidden={loading} padding="4" minHeight="20">
            <p>加载完成后的真实内容。</p>
            <p>关闭 loading 后应恢复文字可见性，并退出占位动画。</p>
          </Skeleton>
        </div>
        <p role="status">当前状态：{loading ? '加载中' : '内容已显示'}</p>
      </div>

      <div className={css({ display: 'grid', gap: '3', maxWidth: 'md' })}>
        <h3>Badge / Card · 分维度定制</h3>
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
        <Card.Root variant="unstyled" bg="gray.3" borderRadius="lg">
          <Card.Header>
            <Card.Title fontWeight="bold">自定外观，保留卡片间距</Card.Title>
            <Card.Description color="gray.11">
              单档尺寸继续保留，不需要重新设置全部 slots。
            </Card.Description>
          </Card.Header>
          <Card.Body>背景、圆角、标题字重与描述颜色由当前实例定义。</Card.Body>
          <Card.Footer>
            <Button type="button" size="sm" onClick={() => setActions((count) => count + 1)}>
              操作
            </Button>
          </Card.Footer>
        </Card.Root>
      </div>
    </section>
  )
}
