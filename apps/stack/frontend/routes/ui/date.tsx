import { createFileRoute } from '@tanstack/react-router'
import { DatePickerPreview } from './-DatePickerPreview'

export const Route = createFileRoute('/ui/date')({ component: DatePickerPreview })
