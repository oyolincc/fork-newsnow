import { Avatar, Button, Heading, Table, Tag, Text } from '@newsnow/ui'
import { useState } from 'react'
import { hstack, vstack } from 'styled-system/patterns'

const rows = [
  { name: 'Table', group: '数据展示', count: 12 },
  { name: 'Tag', group: '数据展示', count: 8 },
  { name: 'Breadcrumb', group: '导航', count: 5 },
  { name: 'Grid', group: '布局', count: 3 },
  { name: 'Stack', group: '布局', count: 9 },
  { name: 'FileUpload', group: '表单', count: 6 },
]

export function TableTagPreview() {
  const [tags, setTags] = useState(['Panda CSS', 'Ark UI', 'Park UI'])
  const [customTagVisible, setCustomTagVisible] = useState(true)
  const [striped, setStriped] = useState(true)
  const [interactive, setInteractive] = useState(true)

  return (
    <section className={vstack({ alignItems: 'stretch', gap: '6', p: { base: '6', md: '10' } })}>
      <Heading size="2xl">Table 与 Tag</Heading>
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

      <Heading as="h3" size="lg">
        Tag 配方、尺寸与插槽
      </Heading>
      <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
        <Tag.Root size="sm" variant="subtle">
          <Tag.Label>Small</Tag.Label>
        </Tag.Root>
        <Tag.Root size="md" variant="surface">
          <Tag.Label>Medium</Tag.Label>
        </Tag.Root>
        <Tag.Root size="lg" variant="outline">
          <Tag.Label>Large</Tag.Label>
        </Tag.Root>
        <Tag.Root size="xl" variant="solid">
          <Tag.Label>Extra large</Tag.Label>
        </Tag.Root>
        <Tag.Root size="lg" colorPalette="green">
          <Tag.StartElement>
            <Avatar.Root size="full">
              <Avatar.Fallback name="Ada" />
            </Avatar.Root>
          </Tag.StartElement>
          <Tag.Label>Ada</Tag.Label>
        </Tag.Root>
        <Tag.Root maxWidth="40">
          <Tag.Label>这是一段需要截断的较长标签文本</Tag.Label>
        </Tag.Root>
        <Tag.Root asChild variant="outline">
          <button type="button" onClick={() => setTags(['Panda CSS', 'Ark UI', 'Park UI'])}>
            <Tag.Label>重置标签</Tag.Label>
          </button>
        </Tag.Root>
      </div>
      <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
        {tags.map((label) => (
          <Tag.Root key={label}>
            <Tag.Label>{label}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger
                aria-label={`移除 ${label}`}
                onClick={() => setTags((current) => current.filter((value) => value !== label))}
              />
            </Tag.EndElement>
          </Tag.Root>
        ))}
        <Tag.Root variant="outline">
          <Tag.Label>自定义关闭内容</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger aria-label="禁用的关闭按钮" disabled>
              ×
            </Tag.CloseTrigger>
          </Tag.EndElement>
        </Tag.Root>
      </div>

      <Heading as="h3" size="lg">
        Tag · 分维度定制
      </Heading>
      <div className={hstack({ gap: '3', flexWrap: 'wrap' })}>
        {customTagVisible && (
          <Tag.Root size="unstyled" minHeight="26px" px="2" gap="1.5" lineHeight="1">
            <Tag.StartElement width="18px" height="18px">
              <Avatar.Root size="full">
                <Avatar.Fallback name="Ada" />
              </Avatar.Root>
            </Tag.StartElement>
            <Tag.Label textStyle="xs">自定尺寸</Tag.Label>
            <Tag.EndElement width="14px" height="14px">
              <Tag.CloseTrigger
                aria-label="移除自定尺寸标签"
                onClick={() => setCustomTagVisible(false)}
              />
            </Tag.EndElement>
          </Tag.Root>
        )}
        {!customTagVisible && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setCustomTagVisible(true)}>
            恢复自定尺寸标签
          </Button>
        )}
        <Tag.Root
          variant="unstyled"
          bg="lime.3"
          color="lime.11"
          borderRadius="full"
          fontWeight="semibold">
          <Tag.Label>自定外观</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger
              borderRadius="full"
              focusVisibleRing="inside"
              aria-label="禁用的自定外观关闭按钮"
              disabled
              css={{ _disabled: { opacity: 0.5 } }}
            />
          </Tag.EndElement>
        </Tag.Root>
      </div>

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
    </section>
  )
}
