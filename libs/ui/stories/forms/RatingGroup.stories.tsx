import { fn } from 'storybook/test'
import { Button, RatingGroup } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/RatingGroup',
  component: RatingGroup.Root,
  args: {
    size: 'md',
    count: 5,
    allowHalf: true,
    disabled: false,
    readOnly: false,
    onValueChange: fn(),
  },
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled', 'xl', 'xs'] },
    count: { control: 'number' },
    allowHalf: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    onValueChange: { control: false },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '评分、半星、只读与尺寸定制。' },
    },
  },
} satisfies Meta<typeof RatingGroup.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: { disable: false, include: ['size', 'count', 'allowHalf', 'disabled', 'readOnly'] },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <RatingGroup.Root {...args} defaultValue={3.5}>
        <RatingGroup.Label>评分</RatingGroup.Label>
        <RatingGroup.Control />
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>
    </div>
  ),
}

export const HalfRating: Story = {
  render: function HalfRating() {
    const [rating, setRating] = useState(3.5)

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
            setRating(3.5)
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <div className={css({ display: 'grid', gap: '3' })}>
            <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>评分与半星</h3>
            <RatingGroup.Root
              name="rating"
              count={5}
              allowHalf
              value={rating}
              onValueChange={({ value }) => setRating(value)}>
              <RatingGroup.Label>体验评分</RatingGroup.Label>
              <RatingGroup.Control />
              <RatingGroup.HiddenInput />
            </RatingGroup.Root>
            <RatingGroup.Root defaultValue={4} readOnly size="sm">
              <RatingGroup.Label>只读评分</RatingGroup.Label>
              <RatingGroup.Control />
            </RatingGroup.Root>
            <p role="status">当前评分：{rating}</p>
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
        <RatingGroup.Root size="unstyled" name="custom-rating" defaultValue={3.5} allowHalf gap="4">
          <RatingGroup.Label>32px 半星评分</RatingGroup.Label>
          <RatingGroup.Control gap="3">
            {[1, 2, 3, 4, 5].map((index) => (
              <RatingGroup.Item key={index} index={index}>
                <RatingGroup.ItemIndicator width="32px" height="32px" />
              </RatingGroup.Item>
            ))}
          </RatingGroup.Control>
          <RatingGroup.HiddenInput />
        </RatingGroup.Root>
      </div>
    )
  },
}
