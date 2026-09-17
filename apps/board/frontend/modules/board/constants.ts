import type { SourceID } from '@newsnow/definition/frontend'

// 关注列表和最后修改时间保存在浏览器 localStorage 的这个键下。
export const BOARD_PREFERENCES_STORAGE_KEY = 'newsnow:board-preferences'

// 用户连续关注、取消或拖拽时先不上传，停手 10 秒后只上传最后一次结果。
export const BOARD_SYNC_DEBOUNCE_MS = 10_000

// 拖动经过很多卡片时，至少间隔 200ms 才调整一次顺序，避免画面抖动和反复写 localStorage。
export const BOARD_REORDER_INTERVAL_MS = 200

// 用户还没选中搜索结果时，弹窗右侧先展示 GitHub 今日趋势卡片。
export const SOURCE_SEARCH_DEFAULT_SOURCE = 'github-trending-today' satisfies SourceID
