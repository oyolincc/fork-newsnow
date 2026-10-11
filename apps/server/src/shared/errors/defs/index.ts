import { ErrorHttpStatus } from '../constants'
import { defineErrorCategories } from '../proto'
import type { ErrorCategoryItem } from '../types'

const normalErrorCategories = {
  INTERNAL: { status: ErrorHttpStatus.INTERNAL, message: 'Internal Server Error' },
  CLIENT_ABORTED: { status: ErrorHttpStatus.CANCELLED, message: 'Request aborted' },
  VALIDATION: {
    status: ErrorHttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Request validation failed',
  },
  NOT_FOUND: { status: ErrorHttpStatus.NOT_FOUND, message: 'Resource not found' },
} satisfies Record<string, ErrorCategoryItem>

export const E = defineErrorCategories({ NORMAL: normalErrorCategories })
