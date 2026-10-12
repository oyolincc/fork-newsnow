import { createFileRoute } from '@tanstack/react-router'
import { OverlayManagerPreview } from './-OverlayManagerPreview'

export const Route = createFileRoute('/ui/overlay-manager')({ component: OverlayManagerPreview })
