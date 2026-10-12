import {
  Alert,
  Avatar,
  Button,
  Heading,
  Link,
  Progress,
  ProgressCircle,
  Text,
  useProgress,
} from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

export function FeedbackPreview() {
  const [value, setValue] = useState(40)
  const [indeterminate, setIndeterminate] = useState(false)
  const progress = useProgress({ defaultValue: 25 })

  return (
    <section
      aria-labelledby="feedback-heading"
      className={css({ display: 'grid', gap: '6', padding: { base: '6', md: '10' } })}>
      <Heading id="feedback-heading" textStyle="2xl">
        Avatar、Alert、Progress 与基础排版
      </Heading>

      <div className={css({ display: 'grid', gap: '3' })}>
        <Heading as="h3" textStyle="lg">
          头像与回退
        </Heading>
        <div className={css({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4' })}>
          <Avatar.Root size="sm" variant="solid">
            <Avatar.Fallback name="Park UI" />
          </Avatar.Root>
          <Avatar.Root size="md" variant="surface" shape="rounded">
            <Avatar.Fallback name="  News   Now  " />
          </Avatar.Root>
          <Avatar.Root size="lg" variant="outline" shape="square">
            <Avatar.Fallback />
          </Avatar.Root>
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name="Random User" />
            <Avatar.Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
          </Avatar.Root>
          <Avatar.Root size="xl">
            <Avatar.Fallback asChild>
              <span>自定义</span>
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
        <Text color="fg.muted">
          支持姓名缩写、默认图标、自定义节点和本地图片，不请求外部头像服务。
        </Text>
      </div>

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

      <div className={css({ display: 'grid', gap: '4', maxWidth: 'xl' })}>
        <Heading as="h3" textStyle="lg">
          线性与圆形进度
        </Heading>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
          <Button
            type="button"
            variant="outline"
            disabled={value === 0}
            onClick={() => setValue((current) => Math.max(0, current - 20))}>
            减少
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={value === 100}
            onClick={() => setValue((current) => Math.min(100, current + 20))}>
            增加
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIndeterminate((current) => !current)}>
            {indeterminate ? '使用确定值' : '使用未定进度'}
          </Button>
        </div>
        <Progress.Root value={indeterminate ? null : value} shape="full">
          <div className={css({ display: 'flex', justifyContent: 'space-between', mb: '2' })}>
            <Progress.Label>任务进度</Progress.Label>
            <Progress.ValueText />
          </div>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Progress.Root value={value} variant="subtle" striped animated size="lg">
          <Progress.Label>条纹进度</Progress.Label>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <ProgressCircle.Root value={indeterminate ? null : value} size="xl">
          <ProgressCircle.Label>圆形任务进度</ProgressCircle.Label>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3', mt: '2' })}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <ProgressCircle.ValueText />
          </div>
        </ProgressCircle.Root>
        <ProgressCircle.RootProvider value={progress} size="xl" variant="subtle">
          <ProgressCircle.Label>独立 store 与居中数值</ProgressCircle.Label>
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3', mt: '2' })}>
            <div className={css({ position: 'relative', display: 'inline-flex' })}>
              <ProgressCircle.Circle css={{ '--thickness': '5px' }}>
                <ProgressCircle.Track />
                <ProgressCircle.Range strokeLinecap="round" />
              </ProgressCircle.Circle>
              <div
                className={css({
                  position: 'absolute',
                  inset: '0',
                  display: 'grid',
                  placeItems: 'center',
                })}>
                <ProgressCircle.ValueText />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                progress.setValue(progress.value === 100 ? 0 : (progress.value || 0) + 25)
              }>
              {progress.value === 100 ? '重置 store' : 'store 增加 25%'}
            </Button>
          </div>
        </ProgressCircle.RootProvider>
        <Text role="status">{indeterminate ? '未定进度' : `当前进度 ${value}%`}</Text>
      </div>

      <div className={css({ display: 'grid', gap: '3', maxWidth: 'xl' })}>
        <Heading as="h3" textStyle="lg">
          排版与链接
        </Heading>
        <Text textStyle="lg">
          Text 继承主题文本样式，Heading 默认使用 h2，可按标题层级修改 as。
        </Text>
        <Text color="fg.muted" lineClamp={2}>
          这是一段用于展示两行截断的较长文字。基础排版支持 Panda
          的样式属性和原生属性，应用可直接使用主题
          token；组件库保留配方源码以便后续调整。重复内容让示例覆盖多行文本截断。
        </Text>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '4' })}>
          <Link href="#feedback-heading">Underline 链接</Link>
          <Link variant="plain" href="#feedback-heading">
            Plain 链接
          </Link>
          <Link asChild>
            <a href="#feedback-heading">asChild 链接</a>
          </Link>
        </div>
      </div>

      <div className={css({ display: 'grid', gap: '4', maxWidth: 'xl' })}>
        <Heading as="h3" size="lg">
          Avatar / Alert · 分维度定制
        </Heading>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '3', flexWrap: 'wrap' })}>
          <Avatar.Root
            size="unstyled"
            width="36px"
            height="36px"
            fontSize="14px"
            aria-label="自定尺寸头像">
            <Avatar.Fallback name="News Now" lineHeight="1" css={{ _icon: { boxSize: '4' } }} />
          </Avatar.Root>
          <Avatar.Root
            variant="unstyled"
            bg="lime.3"
            color="lime.11"
            fontWeight="bold"
            aria-label="自定外观头像">
            <Avatar.Fallback name="Ada Lovelace" />
          </Avatar.Root>
          <Avatar.Root shape="unstyled" borderRadius="10px" aria-label="自定形状头像">
            <Avatar.Fallback name="Park UI" borderRadius="inherit" />
          </Avatar.Root>
        </div>
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
      <div className={css({ display: 'grid', gap: '4', maxWidth: 'xl' })}>
        <Heading as="h3" size="lg">
          Progress · 分维度定制
        </Heading>
        <Progress.Root size="unstyled" value={indeterminate ? null : value} textStyle="sm">
          <Progress.Label gap="1">自定轨道尺寸</Progress.Label>
          <Progress.ValueText textStyle="xs" lineHeight="1" />
          <Progress.Track height="6px">
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Progress.Root variant="unstyled" value={indeterminate ? null : value}>
          <Progress.Label>自定配色，保留 md 尺寸与未定动画</Progress.Label>
          <Progress.Track bg="gray.3">
            <Progress.Range bg="lime.9" />
          </Progress.Track>
        </Progress.Root>
        <Progress.Root shape="unstyled" size="sm" value={value}>
          <Progress.Label>自定轨道圆角</Progress.Label>
          <Progress.Track borderRadius="3px">
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Progress.Root value={indeterminate ? null : value} striped animated>
          <Progress.Label>默认条纹与未定状态组合对照</Progress.Label>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <div className={css({ display: 'flex', alignItems: 'start', gap: '6', flexWrap: 'wrap' })}>
          <ProgressCircle.Root size="unstyled" value={indeterminate ? null : value} textStyle="sm">
            <ProgressCircle.Label gap="1">自定圆环尺寸</ProgressCircle.Label>
            <ProgressCircle.Circle css={{ '--size': '32px', '--thickness': '3px' }}>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <ProgressCircle.ValueText textStyle="xs" lineHeight="1" />
          </ProgressCircle.Root>
          <ProgressCircle.Root variant="unstyled" value={indeterminate ? null : value}>
            <ProgressCircle.Label>自定圆环配色</ProgressCircle.Label>
            <ProgressCircle.Circle>
              <ProgressCircle.Track stroke="gray.4" />
              <ProgressCircle.Range stroke="lime.9" strokeLinecap="round" />
            </ProgressCircle.Circle>
            <ProgressCircle.ValueText />
          </ProgressCircle.Root>
        </div>
        <Link
          variant="unstyled"
          href="#feedback-heading"
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
    </section>
  )
}
