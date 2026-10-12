import { createFileRoute } from '@tanstack/react-router'
import { TimelinePreview } from './-TimelinePreview'

export const Route = createFileRoute('/ui/timeline')({ component: TimelinePreview })
