import { createFileRoute } from '@tanstack/react-router'
import { ColorPickerPreview } from './-ColorPickerPreview'

export const Route = createFileRoute('/ui/color')({ component: ColorPickerPreview })
