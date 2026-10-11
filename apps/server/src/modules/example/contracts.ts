import * as v from 'valibot'

export const processExampleInputSchema = v.object({
  message: v.pipe(v.string(), v.minLength(1)),
})

export const createExampleInputSchema = v.object({
  message: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(500)),
})
