import { type ObjectSchema, type ObjectEntries, parse, safeParse } from 'valibot'

export interface ConfigGetterOptions<TSafe extends boolean = boolean> {
  safe?: TSafe
  caser?: (str: string) => string
}

export interface ParserOptions<TSafe extends boolean = boolean> {
  safe: TSafe
}

/**
 * 创建一个配置提取器
 * @param depKeys 依赖的原始变量 Keys（如 ['DB_HOST', 'DB_PORT']）
 * @param parser 业务 Schema 校验器
 */
export function createConfigGetter<
  TParser extends (input: Record<string, any>, opts: ParserOptions) => any,
>(
  depKeys: string[],
  parser: TParser,
): (envCtx: Record<string, any>, options?: ConfigGetterOptions) => ReturnType<TParser> {
  return (envCtx, options) => {
    const { safe = true, caser } = options || {}
    const filteredInput: Record<string, any> = {}

    for (const key of depKeys) {
      const targetKey = caser ? caser(key) : key
      if (targetKey) filteredInput[targetKey] = envCtx[key]
    }

    return parser(filteredInput, { safe })
  }
}

export function createValibotConfigGetter<S extends ObjectSchema<ObjectEntries, any>>(schema: S) {
  return createConfigGetter(Object.keys(schema.entries), (input, { safe }) => {
    return safe ? safeParse(schema, input) : parse(schema, input)
  }) as <Safe extends boolean = true>(
    envCtx: Record<string, any>,
    options?: ConfigGetterOptions<Safe>,
  ) => Safe extends false ? ReturnType<typeof parse<S>> : ReturnType<typeof safeParse<S>>
}
