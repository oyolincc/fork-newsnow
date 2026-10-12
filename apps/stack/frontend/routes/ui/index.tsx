import { createFileRoute } from '@tanstack/react-router'
import { ButtonPreview } from './-ButtonPreview'
import { ConveniencePreview } from './-ConveniencePreview'

export const Route = createFileRoute('/ui/')({ component: Preview })

function Preview() {
  return (
    <>
      <ButtonPreview />
      <ConveniencePreview />
    </>
  )
}
