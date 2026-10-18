import { Button, ColorPicker, Heading, Portal, parseColor, useColorPicker } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'
import { hstack, vstack } from 'styled-system/patterns'

import type { Meta, StoryObj } from '@storybook/react-vite'
const swatches = ['#000000', '#ffffff', '#ef4444', '#22c55e', '#3b82f6', '#eab308', '#8b5cf6']
function PickerPanel() {
  return (
    <>
      <ColorPicker.Area />
      <div className={hstack({ gap: '3' })}>
        <ColorPicker.Sliders />
        <ColorPicker.EyeDropper />
      </div>
      <ColorPicker.SwatchGroup aria-label="预设颜色">
        {swatches.map((color) => (
          <ColorPicker.SwatchTrigger key={color} value={color} aria-label={`选择 ${color}`}>
            <ColorPicker.Swatch value={color}>
              <ColorPicker.SwatchIndicator />
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
        ))}
      </ColorPicker.SwatchGroup>
    </>
  )
}
const meta = {
  title: 'Color/ColorPicker',
  component: ColorPicker.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '颜色区域、通道、预设色、只读与内联 store。' },
    },
  },
} satisfies Meta<typeof ColorPicker.Root>
export default meta
type Story = StoryObj<typeof meta>
export const ControlledForm: Story = {
  render: function ControlledForm() {
    const [value, setValue] = useState(() => parseColor('#3b82f6'))
    const [disabled, setDisabled] = useState(false)
    const [submitted, setSubmitted] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>拖动颜色区域或滑条，也可通过键盘方向键调整。吸管由浏览器能力决定是否可用。</p>
        <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
          <Button variant="outline" onClick={() => inputRef.current?.focus()}>
            通过 ref 聚焦颜色输入
          </Button>
          <Button variant="outline" onClick={() => setDisabled(!disabled)} aria-pressed={disabled}>
            {disabled ? '启用' : '禁用'}
          </Button>
          <Button variant="plain" onClick={() => setValue(parseColor('#3b82f6'))}>
            外部重置颜色
          </Button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const accent = new FormData(event.currentTarget).get('accent')
            setSubmitted(typeof accent === 'string' ? accent : '')
          }}
          className={vstack({ alignItems: 'start', gap: '3' })}>
          <ColorPicker.Root
            value={value}
            onValueChange={({ value }) => setValue(value)}
            disabled={disabled}
            name="accent"
            positioning={{ placement: 'bottom-start' }}
            width="64">
            <ColorPicker.Label>受控弹出式颜色选择</ColorPicker.Label>
            <ColorPicker.Control>
              <ColorPicker.Input ref={inputRef} aria-label="十六进制颜色" />
              <ColorPicker.Trigger aria-label="打开颜色面板" />
            </ColorPicker.Control>
            <Portal>
              <ColorPicker.Positioner>
                <ColorPicker.Content aria-label="颜色选择面板">
                  <PickerPanel />
                </ColorPicker.Content>
              </ColorPicker.Positioner>
            </Portal>
            <ColorPicker.HiddenInput />
          </ColorPicker.Root>
          <Button type="submit" disabled={disabled}>
            读取表单颜色（不发送请求）
          </Button>
        </form>
        <p role="status">
          受控值：{value.toString('hexa')}；表单值：{submitted || '尚未读取'}
        </p>
      </div>
    )
  },
}
export const InlineStore: Story = {
  render: function InlineStore() {
    const store = useColorPicker({
      defaultValue: parseColor('rgba(34, 197, 94, 0.6)'),
      format: 'rgba',
      inline: true,
    })
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading size="md">内联 · RootProvider · RGBA 通道</Heading>
        <Button
          variant="outline"
          alignSelf="start"
          onClick={() => store.setValue(parseColor('rgba(239, 68, 68, 0.5)'))}>
          通过 store 设置半透明红色
        </Button>
        <ColorPicker.RootProvider value={store} size="sm" variant="subtle" width="72">
          <ColorPicker.Label>内联面板</ColorPicker.Label>
          <div className={vstack({ gap: '3', alignItems: 'stretch' })}>
            <PickerPanel />
            <ColorPicker.FormatSelect aria-label="颜色通道格式" />
            {(['rgba', 'hsla', 'hsba'] as const).map((format) => (
              <ColorPicker.View key={format} format={format}>
                <div className={hstack({ gap: '2' })}>
                  {ColorPicker.getColorChannels(format).map((channel) => (
                    <label
                      key={channel}
                      className={vstack({
                        gap: '1',
                        alignItems: 'stretch',
                        flex: '1',
                        minWidth: '0',
                      })}>
                      <ColorPicker.ChannelText>{channel}</ColorPicker.ChannelText>
                      <ColorPicker.ChannelInput channel={channel} aria-label={channel} />
                    </label>
                  ))}
                </div>
              </ColorPicker.View>
            ))}
            <ColorPicker.ValueText className={css({ textStyle: 'sm' })} />
          </div>
        </ColorPicker.RootProvider>
      </div>
    )
  },
}
export const ReadOnly: Story = {
  render: function ReadOnly() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading size="md">只读 · 自定义 children · 大尺寸</Heading>
        <ColorPicker.Root defaultValue={parseColor('#8b5cf6')} readOnly size="lg" width="64">
          <ColorPicker.Label>只读颜色</ColorPicker.Label>
          <ColorPicker.Control>
            <ColorPicker.Input aria-label="只读颜色值" />
            <ColorPicker.Trigger aria-label="查看只读颜色">
              <span>颜色</span>
            </ColorPicker.Trigger>
          </ColorPicker.Control>
        </ColorPicker.Root>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading size="md">分维度定制 · 紧凑颜色选择</Heading>
        <ColorPicker.Root
          size="unstyled"
          inline
          defaultValue={parseColor('#22c55e')}
          width="60"
          gap="2"
          css={{
            '& [data-part=channel-slider]': { height: '12px' },
            '& [data-part=channel-slider-track]': { height: 'full' },
            '& [data-part=channel-slider-thumb], & [data-part=area-thumb]': { boxSize: '14px' },
          }}>
          <ColorPicker.Label textStyle="sm">自定尺寸，保留 outline 外观</ColorPicker.Label>
          <ColorPicker.Control gap="2">
            <ColorPicker.Input height="36px" px="2" textStyle="sm" aria-label="紧凑颜色值" />
          </ColorPicker.Control>
          <ColorPicker.Area height="128px" />
          <ColorPicker.Sliders gap="2" px="1" />
        </ColorPicker.Root>
        <ColorPicker.Root
          variant="unstyled"
          inline
          defaultValue={parseColor('#8b5cf6')}
          width="64"
          css={{
            '& [data-part=area-thumb], & [data-part=channel-slider-thumb]': {
              borderRadius: 'full',
              border: '2px solid white',
              boxShadow: 'sm',
              focusVisibleRing: 'outside',
            },
          }}>
          <ColorPicker.Label>自定外观，保留 md 尺寸</ColorPicker.Label>
          <ColorPicker.Control>
            <ColorPicker.Input
              bg="gray.3"
              borderRadius="lg"
              focusVisibleRing="inside"
              aria-label="自定外观颜色值"
            />
          </ColorPicker.Control>
          <ColorPicker.Area borderRadius="lg" />
          <ColorPicker.Sliders />
        </ColorPicker.Root>
      </div>
    )
  },
}
