import { Button, TagsInput } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Forms/TagsInput',
  component: TagsInput.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '标签增删、编辑、数量限制及错误状态。' },
    },
  },
} satisfies Meta<typeof TagsInput.Root>
export default meta
type Story = StoryObj<typeof meta>
export const ControlledForm: Story = {
  render: function ControlledForm() {
    const [tags, setTags] = useState(['Ark UI', 'Panda CSS'])

    const [invalid, setInvalid] = useState(false)

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
            setTags(['Ark UI', 'Panda CSS'])
            setInvalid(false)
            setSubmittedForm('已重置')
          }}
          className={css({ display: 'grid', gap: '4' })}>
          <div className={css({ display: 'grid', gap: '3' })}>
            <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>标签输入</h3>
            <TagsInput.Root
              name="tags"
              value={tags}
              onValueChange={({ value }) => setTags(value)}
              max={5}
              editable
              variant="outline"
              size="md">
              <TagsInput.Label>技术标签（最多五个）</TagsInput.Label>
              <TagsInput.Control>
                <TagsInput.Items />
                <TagsInput.Input placeholder="输入后按 Enter" />
                <TagsInput.ClearTrigger aria-label="清空技术标签" />
              </TagsInput.Control>
              <TagsInput.HiddenInput />
            </TagsInput.Root>
            <TagsInput.Root defaultValue={['只读标签']} readOnly variant="subtle" size="sm">
              <TagsInput.Label>只读状态</TagsInput.Label>
              <TagsInput.Control>
                <TagsInput.Items />
                <TagsInput.Input />
              </TagsInput.Control>
            </TagsInput.Root>
            <TagsInput.Root variant="subtle" invalid={invalid} defaultValue={['Subtle']}>
              <TagsInput.Label>错误状态对照 · subtle</TagsInput.Label>
              <TagsInput.Control>
                <TagsInput.Items />
                <TagsInput.Input placeholder="聚焦检查错误边框" />
              </TagsInput.Control>
            </TagsInput.Root>
            <TagsInput.Root variant="surface" invalid={invalid} defaultValue={['Surface']}>
              <TagsInput.Label>错误状态对照 · surface</TagsInput.Label>
              <TagsInput.Control>
                <TagsInput.Items />
                <TagsInput.Input placeholder="聚焦检查错误边框" />
              </TagsInput.Control>
            </TagsInput.Root>
            <Button variant="outline" onClick={() => setInvalid((current) => !current)}>
              {invalid ? '清除错误' : '显示错误'}
            </Button>
            <p role="status">标签：{tags.join('、') || '无'}；支持增删和编辑，不发送网络请求。</p>
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
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <TagsInput.Root
          size="unstyled"
          name="compact-tags"
          defaultValue={['Panda', 'Ark']}
          editable
          gap="1.5"
          textStyle="sm"
          css={{
            '& [data-part=item-preview], & [data-part=item-input]': {
              height: '24px',
              px: '2',
              gap: '1',
              lineHeight: '1',
            },
            '& [data-part=item-delete-trigger], & [data-part=clear-trigger]': {
              boxSize: '4',
              _icon: { boxSize: '3.5' },
            },
          }}>
          <TagsInput.Label>自定尺寸的标签</TagsInput.Label>
          <TagsInput.Control minHeight="36px" px="2" gap="1.5">
            <TagsInput.Items />
            <TagsInput.Input height="28px" px="1" minWidth="16" placeholder="添加标签" />
            <TagsInput.ClearTrigger aria-label="清空紧凑标签" />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
        <TagsInput.Root
          variant="unstyled"
          defaultValue={['品牌页面']}
          editable
          css={{
            '& [data-part=item-preview]': { bg: 'lime.3', color: 'lime.11', borderRadius: 'md' },
            '& [data-part=input], & [data-part=item-input]': { outline: 'none' },
          }}>
          <TagsInput.Label>自定外观，保留 md 尺寸</TagsInput.Label>
          <TagsInput.Control
            bg="gray.3"
            borderRadius="lg"
            css={{ _focusWithin: { outline: '2px solid', outlineColor: 'lime.8' } }}>
            <TagsInput.Items />
            <TagsInput.Input placeholder="添加标签" />
            <TagsInput.ClearTrigger aria-label="清空自定外观标签" />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
      </div>
    )
  },
}
