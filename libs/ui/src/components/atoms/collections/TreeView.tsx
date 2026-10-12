'use client'
import { TreeView, useTreeViewContext } from '@ark-ui/react/tree-view'
import type { TreeNode } from '@ark-ui/react/collection'
import { CheckIcon, ChevronRightIcon, MinusIcon } from 'lucide-react'
import type { ComponentProps, JSX, Provider, ReactElement, ReactNode, RefAttributes } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { treeView, type TreeViewVariantProps } from 'styled-system/recipes'
import type { AsProps, JsxHTMLProps, JsxStyleProps, UnstyledProps } from 'styled-system/types'

const {
  withProvider,
  withContext,
  PropsProvider: TreePropsProvider,
} = createSlotRecipeContext(treeView)

export type RootProps<T extends TreeNode = TreeNode> = JsxHTMLProps<
  TreeView.RootProps<T> & RefAttributes<HTMLDivElement> & AsProps & UnstyledProps,
  JsxStyleProps & TreeViewVariantProps
>
export type RootProviderProps<T extends TreeNode = TreeNode> = JsxHTMLProps<
  TreeView.RootProviderProps<T> & RefAttributes<HTMLDivElement> & AsProps & UnstyledProps,
  JsxStyleProps & TreeViewVariantProps
>
export const Root = withProvider(TreeView.Root, 'root') as <T extends TreeNode>(
  props: RootProps<T>,
) => JSX.Element
export const RootProvider = withProvider(TreeView.RootProvider, 'root') as <T extends TreeNode>(
  props: RootProviderProps<T>,
) => JSX.Element
export const PropsProvider = TreePropsProvider as Provider<Partial<RootProps>>
export const Branch = withContext(TreeView.Branch, 'branch')
export const BranchContent = withContext(TreeView.BranchContent, 'branchContent')
export const BranchControl = withContext(TreeView.BranchControl, 'branchControl')
export const BranchTrigger = withContext(TreeView.BranchTrigger, 'branchTrigger')
export const BranchText = withContext(TreeView.BranchText, 'branchText')
export const BranchIndentGuide = withContext(TreeView.BranchIndentGuide, 'branchIndentGuide')
export const Item = withContext(TreeView.Item, 'item')
export const ItemText = withContext(TreeView.ItemText, 'itemText')
export const Label = withContext(TreeView.Label, 'label')
export const Tree = withContext(TreeView.Tree, 'tree')
export const NodeRenameInput = withContext(TreeView.NodeRenameInput, 'nodeRenameInput')
export const BranchIndicator = withContext(TreeView.BranchIndicator, 'branchIndicator', {
  defaultProps: { children: <ChevronRightIcon /> },
})
export const ItemIndicator = withContext(TreeView.ItemIndicator, 'itemIndicator', {
  defaultProps: { children: <CheckIcon /> },
})
export const NodeCheckbox = withContext(TreeView.NodeCheckbox, 'nodeCheckbox', {
  defaultProps: {
    children: (
      <TreeView.NodeCheckboxIndicator indeterminate={<MinusIcon />}>
        <CheckIcon />
      </TreeView.NodeCheckboxIndicator>
    ),
  },
})

export interface NodeRenderProps<T = TreeNode> {
  node: T
  indexPath: number[]
  nodeState: TreeView.NodeState
}
export interface NodeProps<T = TreeNode> {
  render: (props: NodeRenderProps<T>) => ReactNode
  renderBranch?: (props: NodeRenderProps<T>) => ReactNode
  indentGuide?: ReactElement
  branchProps?: BranchProps
  branchContentProps?: BranchContentProps
}
export function Node<T extends TreeNode = TreeNode>({
  render,
  renderBranch,
  indentGuide,
  branchProps,
  branchContentProps,
}: NodeProps<T>): ReactNode {
  const tree = useTreeViewContext()
  const renderNode = (node: T, indexPath: number[]): ReactNode => (
    <TreeView.NodeProvider
      key={tree.collection.getNodeValue(node)}
      node={node}
      indexPath={indexPath}>
      <TreeView.NodeContext>
        {(nodeState) => {
          const props = { node, indexPath, nodeState }
          if (!nodeState.isBranch) return render(props)
          return (
            <Branch {...branchProps}>
              {(renderBranch || render)(props)}
              <BranchContent {...branchContentProps}>
                {indentGuide}
                {tree.collection
                  .getNodeChildren(node)
                  .map((child: T, index: number) => renderNode(child, [...indexPath, index]))}
              </BranchContent>
            </Branch>
          )
        }}
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  )
  return tree.collection
    .getNodeChildren(tree.collection.rootNode)
    .map((node: T, index: number) => renderNode(node, [index]))
}
export type BranchProps = ComponentProps<typeof Branch>
export type BranchContentProps = ComponentProps<typeof BranchContent>
export type BranchControlProps = ComponentProps<typeof BranchControl>
export type BranchTriggerProps = ComponentProps<typeof BranchTrigger>
export type BranchTextProps = ComponentProps<typeof BranchText>
export type BranchIndentGuideProps = ComponentProps<typeof BranchIndentGuide>
export type ItemProps = ComponentProps<typeof Item>
export type ItemTextProps = ComponentProps<typeof ItemText>
export type LabelProps = ComponentProps<typeof Label>
export type TreeProps = ComponentProps<typeof Tree>
export type NodeRenameInputProps = ComponentProps<typeof NodeRenameInput>
export type BranchIndicatorProps = ComponentProps<typeof BranchIndicator>
export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>
export type NodeCheckboxProps = ComponentProps<typeof NodeCheckbox>
export {
  TreeViewContext as Context,
  TreeViewNodeContext as NodeContext,
  TreeViewNodeProvider as NodeProvider,
  TreeViewNodeCheckboxIndicator as NodeCheckboxIndicator,
  useTreeView,
  useTreeViewContext,
  useTreeViewNodeContext,
  type UseTreeViewProps,
  type UseTreeViewReturn,
} from '@ark-ui/react/tree-view'
export type {
  TreeViewExpandedChangeDetails as ExpandedChangeDetails,
  TreeViewSelectionChangeDetails as SelectionChangeDetails,
  TreeViewCheckedChangeDetails as CheckedChangeDetails,
  TreeViewFocusChangeDetails as FocusChangeDetails,
  TreeViewLoadChildrenDetails as LoadChildrenDetails,
  TreeViewLoadChildrenCompleteDetails as LoadChildrenCompleteDetails,
  TreeViewLoadChildrenErrorDetails as LoadChildrenErrorDetails,
  TreeViewRenameStartDetails as RenameStartDetails,
  TreeViewRenameCompleteDetails as RenameCompleteDetails,
  TreeViewNodeState as NodeState,
} from '@ark-ui/react/tree-view'
