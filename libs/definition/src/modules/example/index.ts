export type Example = {
  id: string
  message: string
  createdAt: string
  updatedAt: string
}

export type CreateExampleInput = Pick<Example, 'message'>

export type ProcessExampleInput = Pick<Example, 'message'>

export type ProcessExampleOutput = {
  original: string
  normalized: string
  length: number
}
