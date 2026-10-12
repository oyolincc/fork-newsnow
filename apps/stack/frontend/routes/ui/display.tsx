import { createFileRoute } from '@tanstack/react-router'
import { DisplayPreview } from './-DisplayPreview'
import { FeedbackPreview } from './-FeedbackPreview'
import { ToastPreview } from './-ToastPreview'
import { ScrollAreaPreview } from './-ScrollAreaPreview'

export const Route = createFileRoute('/ui/display')({ component: Preview })

function Preview() {
  return (
    <>
      <DisplayPreview />
      <FeedbackPreview />
      <ToastPreview />
      <ScrollAreaPreview />
    </>
  )
}
