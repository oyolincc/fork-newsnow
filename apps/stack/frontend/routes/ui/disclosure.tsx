import { StepsPreview } from './-StepsPreview'
import { createFileRoute } from '@tanstack/react-router'
import { BreadcrumbPreview } from './-BreadcrumbPreview'
import { TabsPreview } from './-TabsPreview'
import { DisclosurePreview } from './-DisclosurePreview'

export const Route = createFileRoute('/ui/disclosure')({ component: Preview })

function Preview() {
  return (
    <>
      <StepsPreview />
      <BreadcrumbPreview />
      <TabsPreview />
      <DisclosurePreview />
    </>
  )
}
