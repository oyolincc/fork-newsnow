import { createFileRoute } from '@tanstack/react-router'
import { ClipboardPreview } from './-ClipboardPreview'
import { TableTagPreview } from './-TableTagPreview'

export const Route = createFileRoute('/ui/data')({ component: Preview })

function Preview() {
  return (
    <>
      <TableTagPreview />
      <ClipboardPreview />
    </>
  )
}
