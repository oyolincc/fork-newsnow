import * as v from 'valibot'
import { defineSchemaConfig } from '../proto'
import { availableParallelism } from 'node:os'

const workerNumber = (minimum: number, name: string) =>
  v.pipe(
    v.union([v.string(), v.number()]),
    v.transform((value) => Number(value)),
    v.integer(`${name} must be an integer`),
    v.minValue(minimum, `${name} must be at least ${minimum}`),
  )

export const $S_WorkerConfig = v.object({
  /** Worker 池启动时至少保留的 Worker 数量。 */
  minThreads: v.optional(workerNumber(1, 'minThreads'), 1),
  /** Worker 池允许创建的最大 Worker 数量。 */
  maxThreads: v.optional(workerNumber(1, 'maxThreads'), Math.max(2, availableParallelism() + 1)),
  /** 每个 Worker 可同时执行的任务数量。 */
  concurrentTasksPerWorker: v.optional(workerNumber(1, 'concurrentTasksPerWorker'), 1),
  /** Runner 等待队列允许容纳的最大任务数量。 */
  maxQueue: v.optional(workerNumber(0, 'maxQueue'), 12),

  /** 非 Piscina 官方配置，任务从提交到完成的最长时间，0 表示不限制。 */
  workerTaskTimeoutMs: v.optional(workerNumber(0, 'workerTaskTimeoutMs'), 30_000),
})

export type WorkerConfig = v.InferOutput<typeof $S_WorkerConfig>

export const workerConfig = defineSchemaConfig($S_WorkerConfig)
