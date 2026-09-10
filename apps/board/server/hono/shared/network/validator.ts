import type { Context, ValidationTargets } from 'hono'
import { validator } from 'hono-openapi'
import { flatten, type GenericSchema } from 'valibot'
import { E } from '@error-categories'

export const generalValidator = <
  TTarget extends keyof ValidationTargets,
  TSchema extends GenericSchema,
>(
  target: TTarget,
  schema: TSchema,
) =>
  validator(target, schema, (result: { success: boolean; error?: unknown }, _c: Context) => {
    if (!result.success) {
      throw E.NORMAL.VALIDATION.create({
        extensions: {
          validationError: flatten(result.error as any),
        },
      })
    }
  })
