import { camelCase, constantCase, kebabCase, snakeCase } from 'change-case'
import { type ObjectEntries, type ObjectSchema, type InferOutput, parse } from 'valibot'

export type ConfigType = 'static' | 'schema'
export type ContextCase = 'kebab' | 'camel' | 'env' | 'constantCase' | 'snake' | 'raw'

const rawCaser = (str: string) => str || ''

const caserMap: Record<ContextCase, (str: string) => string> = {
  kebab: kebabCase,
  camel: camelCase,
  env: constantCase,
  constantCase: constantCase,
  snake: snakeCase,
  raw: rawCaser,
}

export interface ConfigResolver<TParams, TValue> {
  (...args: undefined extends TParams ? [params?: TParams] : [params: TParams]): TValue
}

export interface SchemaConfigResolverParams {
  context: Record<string, any>
  matchContextKey?: ContextCase | ((str: string) => string)
}
export type SchemaConfigResolver<TSchema extends ObjectSchema<ObjectEntries, any>> = ConfigResolver<
  SchemaConfigResolverParams,
  InferOutput<TSchema>
>

export interface AppConfig<TKind extends ConfigType, R extends ConfigResolver<any, any>> {
  kind: TKind
  resolve: R
}

export type StaticAppConfig<TValue> = AppConfig<'static', ConfigResolver<undefined, TValue>>

export type SchemaAppConfig<TSchema extends ObjectSchema<ObjectEntries, any>> = AppConfig<
  'schema',
  SchemaConfigResolver<TSchema>
> & {
  schema: TSchema
}

export const createSchemaResolver = <TSchema extends ObjectSchema<ObjectEntries, any>>(
  schema: TSchema,
): SchemaConfigResolver<TSchema> => {
  return ({ context, matchContextKey }) => {
    const caser =
      typeof matchContextKey === 'function'
        ? matchContextKey
        : (matchContextKey && caserMap[matchContextKey]) || rawCaser

    const depKeys = Object.keys(schema.entries)
    const filteredInput: Record<string, any> = {}
    for (const key of depKeys) {
      const fromKey = caser(key)
      if (fromKey) filteredInput[key] = context[fromKey]
    }

    const parsed = parse(schema, filteredInput)
    return parsed
  }
}

export const defineStaticConfig = <TValue>(resolver: () => TValue): StaticAppConfig<TValue> => {
  return {
    kind: 'static',
    resolve: resolver,
  }
}

export const defineSchemaConfig = <TSchema extends ObjectSchema<ObjectEntries, any>>(
  schema: TSchema,
): SchemaAppConfig<TSchema> => {
  return {
    kind: 'schema',
    schema: schema,
    resolve: createSchemaResolver(schema),
  }
}
