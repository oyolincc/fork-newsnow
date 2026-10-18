import { Avatar, Badge, Button, Heading, Text, Timeline } from '@newsnow/ui'
import { useRef, useState } from 'react'
import { grid, hstack } from 'styled-system/patterns'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'
const events = [
  { title: '订单已创建', date: '2026-10-11', description: '已确认商品与配送地址。' },
  { title: '订单已发货', date: '2026-10-12', description: '包裹正在运输中。' },
  { title: '订单已签收', date: '2026-10-13', description: '感谢使用。' },
]
function VariantItems({ label }: { label: string }) {
  return events.slice(0, 2).map((event, index) => (
    <Timeline.Item key={event.date}>
      <Timeline.Connector>
        <Timeline.Separator />
        <Timeline.Indicator>{index + 1}</Timeline.Indicator>
      </Timeline.Connector>
      <Timeline.Content>
        <Timeline.Title>
          {label} · {event.title}
        </Timeline.Title>
        <Timeline.Description>{event.description}</Timeline.Description>
      </Timeline.Content>
    </Timeline.Item>
  ))
}
const meta = {
  title: 'Display/Timeline',
  component: Timeline.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '时间线样式、交替布局、组件组合及末尾连线。' },
    },
  },
} satisfies Meta<typeof Timeline.Root>
export default meta
type Story = StoryObj<typeof meta>
export const ControlledSeparator: Story = {
  render: function ControlledSeparator() {
    const [showLastSeparator, setShowLastSeparator] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Text>插槽组合与 Chakra 一致，支持自定义指示器、前置内容及交替排列。</Text>
        <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
          <Button variant="outline" onClick={() => setShowLastSeparator((value) => !value)}>
            末尾连线：{showLastSeparator ? '显示' : '隐藏'}
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              rootRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            }>
            通过 ref 定位时间线
          </Button>
        </div>
        <Timeline.Root ref={rootRef} showLastSeparator={showLastSeparator} aria-label="订单进度">
          {events.map((event, index) => (
            <Timeline.Item key={event.date}>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>{index + 1}</Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>{event.title}</Timeline.Title>
                <Timeline.Description asChild>
                  <time dateTime={event.date}>{event.date}</time>
                </Timeline.Description>
                <Text textStyle="sm">{event.description}</Text>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      </div>
    )
  },
}
export const Variants: Story = {
  tags: ['!dev'],
  render: function Variants() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          样式与尺寸
        </Heading>
        <div className={grid({ columns: { base: 1, md: 2 }, gap: '6' })}>
          <Timeline.Root variant="solid" size="sm" colorPalette="green" aria-label="solid 配方">
            <VariantItems label="solid · sm" />
          </Timeline.Root>
          <Timeline.Root variant="subtle" size="md" colorPalette="green" aria-label="subtle 配方">
            <VariantItems label="subtle · md" />
          </Timeline.Root>
          <Timeline.Root variant="outline" size="lg" colorPalette="green" aria-label="outline 配方">
            <VariantItems label="outline · lg" />
          </Timeline.Root>
          <Timeline.Root variant="plain" size="xl" colorPalette="green" aria-label="plain 配方">
            <VariantItems label="plain · xl" />
          </Timeline.Root>
        </div>
      </div>
    )
  },
}
export const Alternating: Story = {
  render: function Alternating() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          前置日期与交替排列
        </Heading>
        <Timeline.Root size="lg" variant="outline" aria-label="项目动态">
          {events.map((event, index) => (
            <Timeline.Item key={event.date}>
              <Timeline.Content textAlign="end" alignItems="flex-end">
                {index % 2 === 0 ? (
                  <Timeline.Description asChild>
                    <time dateTime={event.date}>{event.date}</time>
                  </Timeline.Description>
                ) : (
                  <Timeline.Title>{event.title}</Timeline.Title>
                )}
              </Timeline.Content>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>{index + 1}</Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                {index % 2 === 0 ? (
                  <Timeline.Title>{event.title}</Timeline.Title>
                ) : (
                  <Timeline.Description asChild>
                    <time dateTime={event.date}>{event.date}</time>
                  </Timeline.Description>
                )}
                <Text textStyle="sm">{event.description}</Text>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      </div>
    )
  },
}
export const Composition: Story = {
  render: function Composition() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          自定义指示器与组件组合
        </Heading>
        <Timeline.PropsProvider value={{ size: 'xl', variant: 'plain' }}>
          <Timeline.Root showLastSeparator aria-label="协作动态">
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator asChild>
                  <Avatar.Root size="full">
                    <Avatar.Fallback name="Ada" />
                  </Avatar.Root>
                </Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>
                  Ada 更新了状态 <Badge colorPalette="green">已完成</Badge>
                </Timeline.Title>
                <Timeline.Description>刚刚</Timeline.Description>
                <Text textStyle="sm">指示器可以使用 Avatar、图标或自定义内容。</Text>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>✓</Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>构建成功</Timeline.Title>
                <Timeline.Description>无需额外状态管理。</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline.Root>
        </Timeline.PropsProvider>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    const [showLastSeparator] = useState(false)

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          分维度定制
        </Heading>
        <Timeline.Root
          size="unstyled"
          showLastSeparator={showLastSeparator}
          aria-label="自定尺寸时间线">
          {events.slice(0, 2).map((event, index) => (
            <Timeline.Item key={event.date} gap="3">
              <Timeline.Connector>
                <Timeline.Separator borderInlineStartWidth="1px" insetInlineStart="10px" />
                <Timeline.Indicator boxSize="20px" textStyle="xs">
                  {index + 1}
                </Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content pb="4" gap="1">
                <Timeline.Title textStyle="sm">{event.title}</Timeline.Title>
                <Timeline.Description textStyle="xs">{event.description}</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
        <Timeline.Root
          variant="unstyled"
          showLastSeparator={showLastSeparator}
          aria-label="自定外观时间线">
          {events.slice(0, 2).map((event, index) => (
            <Timeline.Item key={event.date}>
              <Timeline.Connector>
                <Timeline.Separator borderColor="lime.6" />
                <Timeline.Indicator bg="lime.3" color="lime.11" borderRadius="sm">
                  {index + 1}
                </Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title fontWeight="semibold">{event.title}</Timeline.Title>
                <Timeline.Description color="gray.fg.muted">
                  {event.description}
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      </div>
    )
  },
}
