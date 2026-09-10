import { HTTPException } from 'hono/http-exception'
import { ProblemDetailsError } from 'hono-problem-details'
import { isEmpty, objectEntries } from '@/hono/shared/utils'

const MAX_CAUSE_DEPTH = 5

function compact(input: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const [key, value] of objectEntries(input)) {
    if (isEmpty(value)) continue
    out[key] = value
  }
  return out
}

function serializeUnknown(value: unknown, seen: Set<object>, depth: number): unknown {
  if (!(value instanceof Error)) return isEmpty(value) ? undefined : value
  return compact({
    name: value.name,
    message: value.message,
    stack: value.stack,
    cause: serializeError(value.cause, seen, depth + 1),
  })
}

function serializeError(value: unknown, seen: Set<object>, depth: number): unknown {
  if (!(value instanceof Error)) return isEmpty(value) ? undefined : value
  if (seen.has(value)) return { truncated: 'circular-cause' }
  if (depth > MAX_CAUSE_DEPTH) return { truncated: 'max-cause-depth' }

  seen.add(value)

  if (value instanceof ProblemDetailsError) {
    const { type, status, detail, instance, extensions } = value.problemDetails
    return compact({
      ...extensions,
      type,
      status,
      detail,
      instance,
      cause: serializeError(value.cause, seen, depth + 1),
    })
  }
  if (value instanceof HTTPException) {
    return compact({
      status: value.status,
      detail: value.message,
      cause: serializeError(value.cause, seen, depth + 1),
    })
  }
  return serializeUnknown(value, seen, depth)
}

export function serializeErr(value: unknown) {
  return serializeError(value, new Set(), 0)
}

export function logLevelFor(error: unknown): 'warn' | 'error' {
  if (error instanceof ProblemDetailsError)
    return error.problemDetails.status < 500 ? 'warn' : 'error'
  if (error instanceof HTTPException) return error.status < 500 ? 'warn' : 'error'
  return 'error'
}
