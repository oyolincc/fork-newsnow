// 所有工作任务标识
export const WorkSubject = Object.freeze({
  PROCESS_EXAMPLE: 'PROCESS_EXAMPLE',
} as const)
export type WorkSubject = (typeof WorkSubject)[keyof typeof WorkSubject]

export const WorkerErrorCode = Object.freeze({
  /** Worker 等待队列已满。 */
  QUEUE_FULL: 'WORKER_QUEUE_FULL',
  /** Worker 任务从提交到完成超过允许时限。 */
  TASK_TIMEOUT: 'WORKER_TASK_TIMEOUT',
  /** Worker 任务被取消。 */
  TASK_ABORTED: 'WORKER_TASK_ABORTED',
  /** Worker 任务内部错误。 */
  TASK_INTERNAL: 'WORKER_TASK_INTERNAL',
  /** Worker 未知错误。 */
  UNKNOWN: 'UNKNOWN',
  /** Worker 异常退出或 Pool 暂时没有可用 Worker。 */
  WORKER_UNAVAILABLE: 'WORKER_UNAVAILABLE',
  /** Worker Pool 已进入关闭流程，无法接受新任务。 */
  WORKER_CLOSED: 'WORKER_CLOSED',
} as const)
export type WorkerErrorCode = (typeof WorkerErrorCode)[keyof typeof WorkerErrorCode]
