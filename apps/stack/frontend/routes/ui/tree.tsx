import { createFileRoute } from '@tanstack/react-router'
import { TreeViewPreview } from './-TreeViewPreview'

export const Route = createFileRoute('/ui/tree')({ component: TreeViewPreview })
