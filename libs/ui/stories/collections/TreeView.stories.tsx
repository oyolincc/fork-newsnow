import { Button, Heading, TreeView, createTreeCollection, useTreeView } from '@newsnow/ui'
import { useState } from 'react'
import { hstack } from 'styled-system/patterns'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'
interface DemoNode {
  id: string
  label: string
  disabled?: boolean
  children?: DemoNode[]
  childCount?: number
}
const rootNode: DemoNode = {
  id: 'root',
  label: '',
  children: [
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            { id: 'button', label: 'button.tsx' },
            { id: 'tree', label: 'tree-view.tsx' },
          ],
        },
        { id: 'index', label: 'index.ts' },
      ],
    },
    { id: 'package', label: 'package.json' },
    { id: 'locked', label: '只读配置（禁用）', disabled: true },
  ],
}
const collection = createTreeCollection<DemoNode>({
  rootNode,
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.label,
  nodeToChildren: (node) => node.children || [],
  isNodeDisabled: (node) => Boolean(node.disabled),
})
function Nodes({ checkbox = false }: { checkbox?: boolean }) {
  return (
    <TreeView.Node<DemoNode>
      indentGuide={<TreeView.BranchIndentGuide />}
      renderBranch={({ node, nodeState }) => (
        <TreeView.BranchControl>
          <TreeView.BranchTrigger
            aria-label={`${nodeState.expanded ? '收起' : '展开'} ${node.label}`}>
            <TreeView.BranchIndicator />
          </TreeView.BranchTrigger>
          {checkbox && <TreeView.NodeCheckbox aria-label={`勾选 ${node.label}`} />}
          <TreeView.BranchText>
            {node.label}
            {nodeState.loading ? '（加载中）' : ''}
          </TreeView.BranchText>
        </TreeView.BranchControl>
      )}
      render={({ node }) => (
        <TreeView.Item>
          {checkbox && <TreeView.NodeCheckbox aria-label={`勾选 ${node.label}`} />}
          <TreeView.ItemText>{node.label}</TreeView.ItemText>
          <TreeView.ItemIndicator />
        </TreeView.Item>
      )}
    />
  )
}
const meta = {
  title: 'Collections/TreeView',
  component: TreeView.Root<DemoNode>,
  args: { collection },
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '树形导航、多选、勾选联动和本地异步节点加载。' },
    },
  },
} satisfies Meta<typeof TreeView.Root<DemoNode>>
export default meta
type Story = StoryObj<typeof meta>
export const ControlledSelection: Story = {
  render: function ControlledSelection() {
    const [selected, setSelected] = useState<string[]>(['button'])
    const [expanded, setExpanded] = useState<string[]>(['src', 'components'])
    const [selectedLabels, setSelectedLabels] = useState('button.tsx')

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>点击选择；方向键导航和展开，输入文字查找；多选可使用 Ctrl/Cmd 或 Shift。</p>
        <div className={hstack({ gap: '3' })}>
          <Button variant="outline" onClick={() => setExpanded(['src', 'components'])}>
            展开全部
          </Button>
          <Button variant="outline" onClick={() => setExpanded([])}>
            收起全部
          </Button>
          <Button
            variant="plain"
            onClick={() => {
              setSelected([])
              setSelectedLabels('')
            }}>
            清空选择
          </Button>
        </div>
        <TreeView.Root
          collection={collection}
          selectionMode="multiple"
          selectedValue={selected}
          expandedValue={expanded}
          onExpandedChange={({ expandedValue }) => setExpanded(expandedValue)}
          onSelectionChange={({ selectedValue, selectedNodes }) => {
            setSelected(selectedValue)
            setSelectedLabels(selectedNodes.map((node) => node.label).join('、'))
          }}
          animateContent>
          <TreeView.Label>受控多选 · 默认外观 · 递归 Node</TreeView.Label>
          <TreeView.Tree>
            <Nodes />
          </TreeView.Tree>
        </TreeView.Root>
        <p role="status">已选择：{selectedLabels || '无'}</p>
      </div>
    )
  },
}
export const Checkboxes: Story = {
  render: function Checkboxes() {
    const [checked, setChecked] = useState<string[]>(['button'])

    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <TreeView.Root
          collection={collection}
          size="sm"
          variant="solid"
          defaultExpandedValue={['src', 'components']}
          checkedValue={checked}
          onCheckedChange={({ checkedValue }) => setChecked(checkedValue)}>
          <TreeView.Label>复选与父节点半选 · solid</TreeView.Label>
          <TreeView.Tree>
            <Nodes checkbox />
          </TreeView.Tree>
        </TreeView.Root>
        <p role="status">已勾选：{checked.join('、') || '无'}</p>
      </div>
    )
  },
}
export const LazyStore: Story = {
  render: function LazyStore() {
    const [lazyCollection, setLazyCollection] = useState(() =>
      createTreeCollection<DemoNode>({
        rootNode: {
          id: 'root',
          label: '',
          children: [{ id: 'lazy', label: '按需加载目录', childCount: 2 }],
        },
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.label,
        nodeToChildren: (node) => node.children || [],
        nodeToChildrenCount: (node) => node.childCount,
      }),
    )
    const store = useTreeView({
      collection: lazyCollection,
      onLoadChildrenComplete: ({ collection }) => setLazyCollection(collection),
      loadChildren: async ({ node }) =>
        node.id === 'lazy'
          ? [
              { id: 'lazy-one', label: '本地异步节点 A' },
              { id: 'lazy-two', label: '本地异步节点 B' },
            ]
          : node.children || [],
    })
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <div className={hstack({ gap: '3' })}>
          <Button variant="outline" onClick={() => store.expand(['lazy'])}>
            通过 store 展开
          </Button>
          <Button variant="outline" onClick={() => store.collapse()}>
            通过 store 收起
          </Button>
          <Button variant="outline" onClick={() => store.focus('lazy')}>
            通过 store 聚焦目录
          </Button>
        </div>
        <TreeView.RootProvider value={store} size="xs">
          <TreeView.Label>RootProvider · 本地 Promise 加载，无网络请求</TreeView.Label>
          <TreeView.Tree>
            <Nodes />
          </TreeView.Tree>
        </TreeView.RootProvider>
      </div>
    )
  },
}
export const Customization: Story = {
  render: function Customization() {
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <Heading size="md">分维度定制 · 紧凑树</Heading>
        <TreeView.Root
          collection={collection}
          size="unstyled"
          defaultExpandedValue={['src']}
          gap="2"
          css={{
            '& [data-part=branch-control], & [data-part=item]': {
              minHeight: '30px',
              gap: '1.5',
              paddingInlineStart: 'calc(8px + (var(--depth) - 1) * 16px)',
              paddingInlineEnd: '2',
              py: '1',
            },
            '& [data-part=tree]': { textStyle: 'sm', _icon: { boxSize: '3.5' } },
            '& [data-part=branch-indent-guide]': { display: 'none' },
          }}>
          <TreeView.Label textStyle="sm">自定尺寸，保留 subtle 外观</TreeView.Label>
          <TreeView.Tree>
            <Nodes />
          </TreeView.Tree>
        </TreeView.Root>
        <TreeView.Root
          collection={collection}
          variant="unstyled"
          defaultExpandedValue={['src']}
          defaultSelectedValue={['index']}
          css={{
            '& [data-part=branch-control], & [data-part=item]': {
              borderRadius: 'md',
              cursor: 'pointer',
              focusVisibleRing: 'inside',
              _hover: { bg: 'gray.3' },
              _selected: { bg: 'lime.3', color: 'lime.11' },
              _disabled: { opacity: 0.5 },
            },
          }}>
          <TreeView.Label>自定外观，保留 md 缩进</TreeView.Label>
          <TreeView.Tree>
            <Nodes />
          </TreeView.Tree>
        </TreeView.Root>
      </div>
    )
  },
}
