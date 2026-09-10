import format from 'string-template'
import { problemDetails } from 'hono-problem-details'
import { fz, hasProp } from '@/hono/shared/utils'
import type { ErrorCategoryItem, ErrorCreateInput, Recursive, WithErrorType } from './types'

export function isErrorCategoryItem(obj: unknown): obj is ErrorCategoryItem {
  return !!obj && typeof obj === 'object' && hasProp(obj, 'status') && hasProp(obj, 'message')
}

export function defineErrorCategories<T extends Recursive<ErrorCategoryItem>>(
  value: T,
): WithErrorType<T> {
  function traverse(obj: any, currentPath: string): any {
    if (isErrorCategoryItem(obj)) {
      const { status, message } = obj
      return fz({
        ...obj,
        type: currentPath,
        create(input: ErrorCreateInput = {}) {
          const { msgContext, message: messageOverride, cause, ...rest } = input
          const error = problemDetails({
            ...rest,
            status,
            type: currentPath,
            detail: messageOverride || format(message, msgContext || {}),
          })
          if (cause !== undefined) error.cause = cause
          return error
        },
      })
    }
    const result: any = {}
    for (const key of Object.keys(obj)) {
      const nextPath = currentPath ? `${currentPath}.${key}` : key
      result[key] = traverse(obj[key], nextPath)
    }
    return fz(result)
  }

  return traverse(value, '')
}
