import type { Context, Hono } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { swaggerUI } from '@hono/swagger-ui'
import { generateSpecs, resolver, type DescribeRouteOptions } from 'hono-openapi'
import { object, unknown, type GenericSchema } from 'valibot'
import { stringify } from 'yaml'
import type { AppEnv } from '@/hono/shared/app/types'
import type { SuccessResObjBody } from './types'

export function createSuccessObjBody<TData>(data: TData): SuccessResObjBody<TData> {
  return { data }
}

export const successJson = <T>(context: Context, data: T, status: ContentfulStatusCode = 200) =>
  context.json(createSuccessObjBody(data), status)

export const OpenApiTags = Object.freeze({ Auth: 'Auth', Source: 'Source', User: 'User' })

type OpenApiResponse = NonNullable<DescribeRouteOptions['responses']>[string]

export type ApiJsonResponseOptions = {
  description?: string
  dataSchema?: GenericSchema
}

const createApiJsonResponse = ({
  description,
  dataSchema = unknown(),
}: {
  description: string
  dataSchema?: GenericSchema
}): OpenApiResponse => ({
  description,
  content: { 'application/json': { schema: resolver(object({ data: dataSchema })) } },
})

export const apiSuccessResponse = (options: ApiJsonResponseOptions = {}): OpenApiResponse =>
  createApiJsonResponse({
    description: options.description || '请求成功',
    dataSchema: options.dataSchema,
  })

const docsYamlPath = '/api/docs/openapi.yaml'

export const configureOpenAPI = (app: Hono<AppEnv>) => {
  let yaml: string | undefined
  app.get(docsYamlPath, async (context) => {
    yaml ||= stringify(
      await generateSpecs(
        app,
        {
          documentation: {
            info: { title: 'NewsNow API', version: '1.0.0' },
            tags: Object.values(OpenApiTags).map((name) => ({ name })),
          },
          exclude: [docsYamlPath, '/api/swagger'],
          defaultOptions: { ALL: { responses: { 422: { description: '请求参数校验失败' } } } },
        },
        context,
      ),
    )
    return context.text(yaml, 200, { 'Content-Type': 'application/yaml; charset=utf-8' })
  })
  app.get('/api/swagger', swaggerUI({ url: docsYamlPath }))
}
