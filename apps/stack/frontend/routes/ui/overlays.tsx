import { createFileRoute } from '@tanstack/react-router'
import { DialogPreview } from './-DialogPreview'
import { TooltipPreview } from './-TooltipPreview'
import { OverlayPreview } from './-OverlayPreview'

export const Route = createFileRoute('/ui/overlays')({ component: Preview })

function Preview() {
  return (
    <>
      <DialogPreview />
      <TooltipPreview />
      <OverlayPreview />
    </>
  )
}
