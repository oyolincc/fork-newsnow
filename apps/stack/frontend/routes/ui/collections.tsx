import { createFileRoute } from '@tanstack/react-router'
import { SelectPreview } from './-SelectPreview'
import { ComboboxPreview } from './-ComboboxPreview'

export const Route = createFileRoute('/ui/collections')({ component: Preview })

function Preview() {
  return (
    <>
      <SelectPreview />
      <ComboboxPreview />
    </>
  )
}
