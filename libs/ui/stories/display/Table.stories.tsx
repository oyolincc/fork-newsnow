import { Button, Heading, Table, Text } from '@newsnow/ui'
import { useState } from 'react'
import { hstack } from 'styled-system/patterns'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'
const rows = [
  { name: 'Table', group: '数据展示', count: 12 },
  { name: 'Tag', group: '数据展示', count: 8 },
  { name: 'Breadcrumb', group: '导航', count: 5 },
  { name: 'Grid', group: '布局', count: 3 },
  { name: 'Stack', group: '布局', count: 9 },
  { name: 'FileUpload', group: '表单', count: 6 },
]
const meta = {
  title: 'Display/Table',
  component: Table.Root,
  args: { size: 'md', variant: 'plain', striped: true, interactive: true, columnBorder: false },
  argTypes: {
    columnBorder: { control: 'boolean' },
    interactive: { control: 'boolean' },
    size: { control: 'select', options: ['lg', 'md', 'sm', 'unstyled'] },
    stickyHeader: { control: 'boolean' },
    striped: { control: 'boolean' },
    variant: { control: 'select', options: ['line', 'outline', 'plain', 'surface', 'unstyled'] },
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '表头固定、滚动、原生插槽、条纹与悬停高亮。' },
    },
  },
} satisfies Meta<typeof Table.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  parameters: {
    controls: {
      disable: false,
      include: ['columnBorder', 'interactive', 'size', 'stickyHeader', 'striped', 'variant'],
    },
    docs: { source: { type: 'dynamic' } },
  },
  render: (args) => (
    <div className={css({ maxWidth: '2xl' })}>
      <Table.Root {...args}>
        <Table.Caption>组件统计</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>组件</Table.ColumnHeader>
            <Table.ColumnHeader>类别</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Button</Table.Cell>
            <Table.Cell>操作</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Select</Table.Cell>
            <Table.Cell>集合</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  ),
}

export const Scrollable: Story = {
  render: function Scrollable() {
    const [striped, setStriped] = useState(true)
    const [interactive, setInteractive] = useState(true)
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          固定表头、滚动和可组合配方
        </Heading>
        <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
          <Button variant="outline" onClick={() => setStriped((value) => !value)}>
            条纹：{striped ? '开启' : '关闭'}
          </Button>
          <Button variant="outline" onClick={() => setInteractive((value) => !value)}>
            悬停高亮：{interactive ? '开启' : '关闭'}
          </Button>
        </div>
        <Table.ScrollArea
          maxHeight="56"
          borderWidth="1px"
          borderRadius="sm"
          tabIndex={0}
          aria-label="组件统计表滚动区域">
          <Table.Root
            size="md"
            striped={striped}
            interactive={interactive}
            stickyHeader
            columnBorder
            minWidth="640px">
            <Table.Caption>组件使用次数示例</Table.Caption>
            <Table.ColumnGroup>
              <Table.Column width="45%" />
              <Table.Column />
              <Table.Column />
            </Table.ColumnGroup>
            <Table.Header bg="bg.page">
              <Table.Row>
                <Table.ColumnHeader>名称</Table.ColumnHeader>
                <Table.ColumnHeader>类别</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">次数</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row) => (
                <Table.Row key={row.name}>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.group}</Table.Cell>
                  <Table.Cell textAlign="end">{row.count}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={2}>合计</Table.Cell>
                <Table.Cell textAlign="end">43</Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table.Root>
        </Table.ScrollArea>
        <Text>悬停高亮可以与条纹同时使用；数字列通过 textAlign 右对齐。</Text>
      </div>
    )
  },
}
export const NativeAndSizes: Story = {
  render: function NativeAndSizes() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          原生表格与小尺寸
        </Heading>
        <Table.Root native size="sm" variant="outline" striped>
          <caption>native 模式直接使用 HTML 插槽</caption>
          <thead>
            <tr>
              <th scope="col">名称</th>
              <th scope="col">类别</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 3).map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.group}</td>
              </tr>
            ))}
          </tbody>
        </Table.Root>
        <Table.Root size="lg" variant="line" interactive>
          <Table.Body>
            <Table.Row>
              <Table.Cell>lg + line 配方</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading as="h3" size="lg">
          Table · 分维度定制
        </Heading>
        <Table.Root
          native
          size="unstyled"
          variant="outline"
          css={{ '& th, & td': { px: '2', py: '1.5', textStyle: 'sm' } }}>
          <caption>自定紧凑尺寸 · native 模式</caption>
          <thead>
            <tr>
              <th scope="col">名称</th>
              <th scope="col">次数</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 2).map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </Table.Root>
        <Table.Root variant="unstyled">
          <Table.Caption color="gray.fg.muted">自定外观 · 保留默认尺寸</Table.Caption>
          <Table.Header bg="lime.3" color="lime.11">
            <Table.Row>
              <Table.ColumnHeader>名称</Table.ColumnHeader>
              <Table.ColumnHeader>次数</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.slice(0, 2).map((row) => (
              <Table.Row key={row.name}>
                <Table.Cell borderBottomWidth="1px" borderColor="lime.5">
                  {row.name}
                </Table.Cell>
                <Table.Cell borderBottomWidth="1px" borderColor="lime.5">
                  {row.count}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    )
  },
}
