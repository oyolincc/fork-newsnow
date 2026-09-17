import { sourceCatalog, type SourceID } from '@newsnow/definition/frontend'

// URL 里只允许这三个栏目，并且导航按钮就按这里的先后顺序显示。
export const ColumnIds = ['focus', 'hottest', 'realtime'] as const
export type ColumnId = (typeof ColumnIds)[number]

// 把 URL 使用的英文栏目名换成用户看到的中文标题。
export const ColumnNames: Record<ColumnId, string> = {
  focus: '关注',
  hottest: '最热',
  realtime: '实时',
}

// 来源数据里写的是 tech、finance 等英文分类，搜索弹窗用这张表显示成“科技、财经”。
export const SourceColumnNames: Record<string, string> = {
  china: '国内',
  finance: '财经',
  sports: '体育',
  tech: '科技',
  world: '国际',
}

// 带 redirect 的来源只是旧名字或别名，列表只保留它最终指向的真实来源，避免同一内容出现两张卡片。
export const CanonicalSourceIds = Object.entries(sourceCatalog)
  .filter(([, source]) => !('redirect' in source))
  .map(([id]) => id as SourceID)

const hasType = (sourceId: SourceID, type: 'hottest' | 'realtime') => {
  const source = sourceCatalog[sourceId]
  return 'type' in source && source.type === type
}

// “最热”和“实时”直接从每个来源的 type 自动生成；以后新增来源时，不用再来这里手工加一次。
export const DefaultColumnSources: Record<Exclude<ColumnId, 'focus'>, SourceID[]> = {
  hottest: CanonicalSourceIds.filter((id) => hasType(id, 'hottest')).sort(),
  realtime: CanonicalSourceIds.filter((id) => hasType(id, 'realtime')).sort(),
}

export const isColumnId = (value: string): value is ColumnId =>
  ColumnIds.includes(value as ColumnId)
export const isCanonicalSourceId = (value: string): value is SourceID =>
  CanonicalSourceIds.includes(value as SourceID)
