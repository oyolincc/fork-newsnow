import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import type { SuccessResObjBody } from './types'

export function createContentDisposition(
  filename?: string,
  options?: {
    asciiFallback?: string
  },
): string {
  if (!filename) {
    return 'inline'
  }
  const { asciiFallback = 'download' } = options || {}

  // 1. 去除换行、引号、反斜杠及正斜杠，防止 Header 注入和路径遍历
  const safeFilename = String(filename).replace(/[\r\n"\\/]/g, '_')

  // 4. RFC 5987 编码：补充 encodeURIComponent 未编码的特殊字符 ( ' ( ) * )
  const rfc5987Filename = encodeURIComponent(safeFilename).replace(
    /['()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  )

  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${rfc5987Filename}`
}

// 成功响应体
export function createSuccessObjBody<TData = any>(data: TData): SuccessResObjBody<TData> {
  return {
    data,
  }
}

export const successJson = <T>(c: Context, data: T, status: ContentfulStatusCode = 200) =>
  c.json(createSuccessObjBody(data), status)
