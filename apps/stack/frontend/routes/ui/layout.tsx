import { createFileRoute } from '@tanstack/react-router'
import { LayoutPreview } from './-LayoutPreview'

export const Route = createFileRoute('/ui/layout')({ component: LayoutPreview })
