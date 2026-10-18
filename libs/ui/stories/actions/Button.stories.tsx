import { Button, ButtonGroup, CloseButton, IconButton } from '@newsnow/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, useRef, useState } from 'react'
import { action } from 'storybook/actions'
import type { MouseEvent } from 'react'
import { css } from 'styled-system/css'

const meta = {
  title: 'Actions/Button',
  component: Button,
  parameters: {
    docs: { description: { component: '支持外观、尺寸、配色、禁用和加载状态的按钮。' } },
    controls: {
      include: [
        'children',
        'variant',
        'size',
        'colorPalette',
        'disabled',
        'loading',
        'loadingText',
        'spinnerPlacement',
      ],
    },
  },
  argTypes: {
    children: { control: 'text', description: '按钮内容' },
    variant: {
      control: 'select',
      options: ['solid', 'surface', 'subtle', 'outline', 'plain', 'unstyled'],
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'unstyled'],
    },
    colorPalette: { control: 'select', options: ['gray', 'lime', 'red', 'green'] },
    disabled: { control: 'boolean', description: '禁用按钮' },
    loading: { control: 'boolean', description: '加载期间展示指示器并禁用按钮' },
    loadingText: { control: 'text', description: '加载时的替代文字' },
    spinnerPlacement: { control: 'inline-radio', options: ['start', 'end'] },
    onClick: { control: false },
  },
  args: {
    children: '按钮',
    variant: 'solid',
    size: 'md',
    colorPalette: 'lime',
    disabled: false,
    loading: false,
    onClick: (event: MouseEvent<HTMLButtonElement>) =>
      action('onClick')({
        type: event.type,
        button: event.button,
        label: event.currentTarget.textContent,
      }),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  tags: ['!dev'],
  parameters: { controls: { exclude: ['children', 'variant'] } },
  render: (args) => (
    <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4' })}>
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="surface">
        Surface
      </Button>
      <Button {...args} variant="subtle">
        Subtle
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="plain">
        Plain
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  tags: ['!dev'],
  args: { loading: true, loadingText: '保存中…' },
}

export const Sizes: Story = {
  tags: ['!dev'],
  parameters: { controls: { exclude: ['children', 'size'] } },
  render: (args) => (
    <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4' })}>
      {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Button {...args} key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  tags: ['!dev'],
  parameters: { controls: { exclude: ['children', 'colorPalette'] } },
  render: (args) => (
    <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4' })}>
      {(['gray', 'lime', 'red', 'green'] as const).map((colorPalette) => (
        <Button {...args} key={colorPalette} colorPalette={colorPalette}>
          {colorPalette}
        </Button>
      ))}
    </div>
  ),
}

export const Customization: Story = {
  parameters: { controls: { disable: true }, docs: { source: { type: 'code' } } },
  render: function Customization() {
    const [clicks, setClicks] = useState(0)
    const headingId = useId()
    return (
      <section className={css({ display: 'grid', gap: '4' })} aria-labelledby={headingId}>
        <h2 id={headingId}>按维度自定义</h2>
        <p>自定尺寸保留默认外观，自定外观保留默认尺寸；点击计数并用 Tab 检查焦点。</p>
        <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3' })}>
          <Button>默认 md / solid</Button>
          <Button size="unstyled" height="64px" px="8" gap="4" textStyle="lg">
            自定尺寸
          </Button>
          <Button
            variant="unstyled"
            bg="gray.12"
            color="gray.1"
            borderRadius="full"
            cursor="pointer"
            focusVisibleRing="outside"
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-3px)' }}
            onClick={() => setClicks((value) => value + 1)}>
            自定外观与悬浮动效
          </Button>
          <Button
            size="unstyled"
            variant="unstyled"
            height="64px"
            px="8"
            textStyle="xl"
            borderRadius="full"
            bg="lime.9"
            color="black"
            focusVisibleRing="outside"
            disabled>
            全自定，保留禁用行为
          </Button>
        </div>
        <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3' })}>
          <IconButton size="unstyled" width="24px" height="24px" aria-label="自定尺寸添加按钮">
            <span aria-hidden="true">＋</span>
          </IconButton>
          <CloseButton size="unstyled" width="24px" height="24px" aria-label="自定尺寸关闭按钮" />
          <ButtonGroup size="unstyled" variant="outline">
            <Button height="24px" px="6">
              组内上一项
            </Button>
            <Button height="24px" px="6">
              组内下一项
            </Button>
          </ButtonGroup>
        </div>
        <p role="status">自定外观按钮已点击 {clicks} 次</p>
        <p>IconButton 保留零内边距，CloseButton 保留 plain / gray；按钮组沿用原有尺寸继承。</p>
      </section>
    )
  },
}

export const Interactions: Story = {
  parameters: { controls: { disable: true }, docs: { source: { type: 'code' } } },
  render: function Interactions(args) {
    const [clicks, setClicks] = useState(0)
    const [loading, setLoading] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const linkTarget = useId()
    const headingId = useId()
    return (
      <section className={css({ display: 'grid', gap: '4' })} aria-labelledby={headingId}>
        <h2 id={headingId}>交互状态</h2>
        <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3' })}>
          <Button
            ref={buttonRef}
            colorPalette="lime"
            onClick={(event) => {
              args.onClick?.(event)
              setClicks((count) => count + 1)
            }}>
            已点击 {clicks} 次
          </Button>
          <Button
            disabled
            onClick={(event) => {
              args.onClick?.(event)
              setClicks((count) => count + 1)
            }}>
            禁用
          </Button>
          <Button variant="outline" onClick={() => buttonRef.current?.focus()}>
            通过 ref 聚焦计数按钮
          </Button>
        </div>
        <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3' })}>
          <Button variant="outline" onClick={() => setLoading(!loading)}>
            {loading ? '结束' : '开始'}加载
          </Button>
          <Button
            loading={loading}
            onClick={(event) => {
              args.onClick?.(event)
              setClicks((count) => count + 1)
            }}>
            保存
          </Button>
          <Button loading={loading} loadingText="保存中…" spinnerPlacement="end">
            保存并继续
          </Button>
        </div>
        <Button asChild variant="plain">
          <a
            href={`#${linkTarget}`}
            onClick={(event) => {
              event.preventDefault()
              event.currentTarget.ownerDocument
                .getElementById(linkTarget)
                ?.scrollIntoView({ block: 'nearest' })
            }}>
            链接按钮
          </a>
        </Button>
        <p id={linkTarget} role="status">
          已点击 {clicks} 次；加载状态：{loading ? '加载中' : '空闲'}
        </p>
      </section>
    )
  },
}

export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ButtonGroup attached variant="outline" size="sm" colorPalette="lime">
      <Button>上一项</Button>
      <Button>当前项</Button>
      <Button>下一项</Button>
    </ButtonGroup>
  ),
}
