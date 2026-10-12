import { Badge, Checkbox, CloseButton, Heading, Icon, IconButton, Spinner } from '@newsnow/ui'
import { useState, type SVGProps } from 'react'
import { css } from 'styled-system/css'

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export function ConveniencePreview() {
  const [checked, setChecked] = useState<Checkbox.CheckedState>(true)
  const [customChecked, setCustomChecked] = useState(true)
  const [message, setMessage] = useState('点击图标按钮或关闭按钮查看状态。')

  return (
    <section
      aria-labelledby="convenience-heading"
      className={css({ display: 'grid', gap: '4', padding: { base: '6', md: '10' } })}>
      <Heading id="convenience-heading" size="2xl">
        常用便捷 API
      </Heading>
      <div className={css({ display: 'grid', gap: '3' })}>
        <Heading as="h3" size="lg">
          标题 size 与 HTML 层级分别控制
        </Heading>
        <Heading as="h4" size="sm">
          sm 标题
        </Heading>
        <Heading as="h4" size="lg" textStyle="sm">
          textStyle 可以覆盖 size 的文字样式
        </Heading>
      </div>

      <div className={css({ display: 'flex', alignItems: 'center', gap: '3', flexWrap: 'wrap' })}>
        <IconButton aria-label="搜索" variant="outline" onClick={() => setMessage('已点击搜索。')}>
          <SearchIcon />
        </IconButton>
        <CloseButton aria-label="关闭提示" onClick={() => setMessage('已点击关闭。')} />
        <Icon asChild size="lg" color="fg.muted">
          <SearchIcon aria-hidden="true" />
        </Icon>
        <span className={css({ display: 'inline-flex', alignItems: 'center', gap: '2' })}>
          <Spinner size="sm" aria-hidden="true" />
          加载中
        </span>
        <Spinner size="lg" aria-label="加载中" role="status" />
      </div>
      <p role="status">{message}</p>

      <div className={css({ display: 'grid', gap: '3' })}>
        <Checkbox.Root checked={checked} onCheckedChange={({ checked }) => setChecked(checked)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Control 默认提供指示器</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root checked="indeterminate">
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>默认半选指示器</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root
          checked={customChecked}
          onCheckedChange={({ checked }) => setCustomChecked(checked === true)}>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            {customChecked && (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="m9 17-5-5 2-2 3 3 9-9 2 2Z" />
              </svg>
            )}
          </Checkbox.Control>
          <Checkbox.Label>自定义 children 替换默认指示器</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root defaultChecked>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>原有显式 Indicator 用法继续有效</Checkbox.Label>
        </Checkbox.Root>
      </div>

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

      <div className={css({ display: 'grid', gap: '3' })}>
        <Heading as="h3">默认标题 · xl</Heading>
        <Heading as="h4" size="unstyled" fontSize="17px" lineHeight="1.5">
          自定字号，保留默认字重
        </Heading>
        <span className={css({ display: 'inline-flex', alignItems: 'center', gap: '2' })}>
          <Icon asChild size="unstyled" width="18px" height="18px" color="lime.11">
            <SearchIcon />
          </Icon>
          自定图标尺寸
        </span>
      </div>
    </section>
  )
}
