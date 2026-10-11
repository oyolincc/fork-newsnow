import { type DescribeRouteOptions, resolver } from 'hono-openapi'
import type { GenericSchema } from 'valibot'

type OpenApiResponse = NonNullable<DescribeRouteOptions['responses']>[string]

export const jsonResponse = (schema: GenericSchema, description = '请求成功'): OpenApiResponse => ({
  description,
  content: {
    'application/json': {
      schema: resolver(schema),
    },
  },
})

export type BinaryResponseOptions = {
  description?: string
  mediaType?: string
  headers?: Record<
    string,
    {
      description?: string
      schema: { type: 'string'; format?: string }
    }
  >
}

export const binaryResponse = ({
  description = '二进制响应',
  mediaType = 'application/octet-stream',
  headers,
}: BinaryResponseOptions = {}): OpenApiResponse => ({
  description,
  ...(headers ? { headers } : {}),
  content: {
    [mediaType]: {
      schema: { type: 'string', format: 'binary' },
    },
  },
})
