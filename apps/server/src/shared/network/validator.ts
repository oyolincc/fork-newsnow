import type { Env, MiddlewareHandler, ValidationTargets } from 'hono'
import { validator } from 'hono-openapi'
import { flatten, type GenericSchema, type InferInput, type InferOutput } from 'valibot'
import { E } from '@/shared/errors/defs'

export const generalValidator = <
  TTarget extends keyof ValidationTargets,
  TSchema extends GenericSchema,
>(
  target: TTarget,
  schema: TSchema,
): MiddlewareHandler<
  Env,
  string,
  {
    in: { [K in TTarget]: InferInput<TSchema> }
    out: { [K in TTarget]: InferOutput<TSchema> }
  }
> =>
  validator(target, schema, (result, _c) => {
    if (!result.success) {
      throw E.NORMAL.VALIDATION.create({
        extensions: {
          validationError: flatten(result.error as any),
        },
      })
    }
  })
