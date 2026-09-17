import { fz } from '#/shared/data/utils/object'

export const SourceDefaults = fz({
  // 切走再切回栏目时已有缓存，只显示 200ms 加载效果，让内容出现得不突兀。
  CACHE_REUSE_DELAY: 200,
  // 三分钟内再次打开同一组来源时不重新下载快照，超过三分钟才向服务端检查更新。
  SNAPSHOTS_STALE_TIME: 180_000,
})
export type SourceDefaults = (typeof SourceDefaults)[keyof typeof SourceDefaults]
