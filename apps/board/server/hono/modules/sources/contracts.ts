import * as v from 'valibot'

export const $S_SourceItemsQuery = v.object({ refresh: v.optional(v.picklist(['true', 'false'])) })
export const $S_SourceSnapshotsQuery = v.object({ sourceIds: v.array(v.string()) })

// TODO: 批量查询当前保持简单；未来依据真实调用量在此定义数量上限、去重、稳定排序与部分失败策略。
