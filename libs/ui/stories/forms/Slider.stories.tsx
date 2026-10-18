import { fn } from 'storybook/test'
import { Button, Slider } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/Slider',
  component: Slider.Root,
  args: {
    orientation: 'horizontal',
    size: 'md',
    variant: 'outline',
    min: 0,
    max: 100,
    step: 5,
    disabled: false,
    onValueChange: fn(),
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled'] },
    variant: { control: 'select', options: ['outline'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    onValueChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '范围与垂直滑块、刻度、步长及键盘操作。' },
    },
  },
} satisfies Meta<typeof Slider.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: {
      disable: false,
      include: ['orientation', 'size', 'variant', 'min', 'max', 'step', 'disabled'],
    },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Slider.Root {...args} defaultValue={[40]} aria-label={['数值']}>
        <Slider.Label>滑块</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </div>
  ),
}

export const RangeAndVertical: Story = {
  render: function RangeAndVertical() {
    const [range, setRange] = useState([25, 75])

    const slider = Slider.useSlider({
      name: 'range',
      value: range,
      min: 0,
      max: 100,
      step: 5,
      minStepsBetweenThumbs: 1,
      'aria-label': ['范围下限', '范围上限'],
      onValueChange: ({ value }) => setRange(value),
    })
    const [submittedForm, setSubmittedForm] = useState('尚未提交')
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            setSubmittedForm(
              JSON.stringify(Array.from(new FormData(event.currentTarget).entries())),
            )
          }}
          onReset={() => {
            setRange([25, 75])
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <div className={css({ display: 'grid', gap: '3' })}>
            <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>范围滑块与刻度</h3>
            <Slider.RootProvider value={slider} size="md">
              <Slider.Label>数值范围</Slider.Label>
              <Slider.ValueText />
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
                <Slider.Marks
                  marks={[
                    { value: 0, label: '0' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                />
              </Slider.Control>
            </Slider.RootProvider>
            <Slider.Root defaultValue={[40]} disabled aria-label={['禁用的滑块']}>
              <Slider.Label>禁用滑块</Slider.Label>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
              </Slider.Control>
            </Slider.Root>
            <Slider.Root
              orientation="vertical"
              defaultValue={[60]}
              height="56"
              width="16"
              aria-label={['垂直滑块']}>
              <Slider.Label>垂直</Slider.Label>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
              </Slider.Control>
            </Slider.Root>
            <p role="status">范围：{range.join(' – ')}</p>
          </div>
          <div className={css({ display: 'flex', gap: '3' })}>
            <Button type="submit">读取本地 FormData</Button>
            <Button type="reset" variant="outline">
              重置
            </Button>
          </div>
          <pre role="status" className={css({ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' })}>
            {submittedForm}
          </pre>
        </form>
      </div>
    )
  },
}
export const CustomSize: Story = {
  render: function CustomSize() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Slider.Root
          size="unstyled"
          name="custom-slider"
          defaultValue={[40]}
          gap="3"
          aria-label={['自定尺寸滑块']}>
          <Slider.Label>28px 滑块与 12px 轨道</Slider.Label>
          <Slider.ValueText />
          <Slider.Control minHeight="28px" mb="8">
            <Slider.Track height="12px">
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} width="28px" height="28px">
              <Slider.HiddenInput />
            </Slider.Thumb>
            <Slider.MarkerGroup top="8px" insetInline="0">
              {[0, 50, 100].map((value) => (
                <Slider.Marker
                  key={value}
                  value={value}
                  flexDirection="column"
                  gap="4"
                  textStyle="sm">
                  <Slider.MarkerIndicator boxSize="6px" />
                  <span>{value}</span>
                </Slider.Marker>
              ))}
            </Slider.MarkerGroup>
          </Slider.Control>
        </Slider.Root>
      </div>
    )
  },
}
