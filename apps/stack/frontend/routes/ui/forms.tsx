import { createFileRoute } from '@tanstack/react-router'
import { NativePasswordPreview } from './-NativePasswordPreview'
import { FieldPreview } from './-FieldPreview'
import { CheckboxPreview } from './-CheckboxPreview'
import { FormsPreview } from './-FormsPreview'
import { AdvancedFormsPreview } from './-AdvancedFormsPreview'
import { ComposedFormsPreview } from './-ComposedFormsPreview'
import { FileUploadPreview } from './-FileUploadPreview'
import { RadioPreview } from './-RadioPreview'

export const Route = createFileRoute('/ui/forms')({ component: Preview })

function Preview() {
  return (
    <>
      <NativePasswordPreview />
      <FieldPreview />
      <CheckboxPreview />
      <FormsPreview />
      <AdvancedFormsPreview />
      <ComposedFormsPreview />
      <RadioPreview />
      <FileUploadPreview />
    </>
  )
}
