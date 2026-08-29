import * as v from 'valibot'

export const $S_NonEmptyString = v.pipe(v.string(), v.minLength(1))

export const $S_BooleanString = v.pipe(
  v.optional(
    v.pipe(
      v.string(),
      v.check((value) => value === 'true' || value === 'false', 'Expected true or false'),
    ),
  ),
  v.transform((value) => value !== 'false'),
)
