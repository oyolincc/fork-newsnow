import type { ExampleRunnerTaskModel } from '@/modules/example/work-task/tasks'
import type { Transferable } from 'node:worker_threads'
import type { WorkerErrorCode, WorkSubject } from './constants'

// export const WorkerInvocationType = Object.freeze({
//   READY: 'READY',
//   TASK: 'TASK',
// } as const)
// export type WorkerInvocationType = (typeof WorkerInvocationType)[keyof typeof WorkerInvocationType]

// export const WorkerSignalType = Object.freeze({
//   STARTED: 'started',
// } as const)
// export type WorkerSignalType = (typeof WorkerSignalType)[keyof typeof WorkerSignalType]

export type DefineRunnerTaskModel<
  TSubject extends WorkSubject,
  TInput,
  TOutput,
  TTaskErrorCode extends string = string,
> = {
  subject: TSubject
  input: TInput
  output: TOutput
  errorCode: TTaskErrorCode | WorkerErrorCode
}

export type AnyRunnerTaskModel = ExampleRunnerTaskModel

export type GetRunnerTaskModel<TSubject extends WorkSubject> = Extract<
  AnyRunnerTaskModel,
  { subject: TSubject }
>

export type RunnerTaskParams<TSubject extends WorkSubject> = Pick<
  GetRunnerTaskModel<TSubject>,
  'input' | 'subject'
>
export type RunnerTaskInput<TSubject extends WorkSubject> = GetRunnerTaskModel<TSubject>['input']
export type RunnerTaskOutput<TSubject extends WorkSubject> = GetRunnerTaskModel<TSubject>['output']
export type RunnerTaskErrorCode<TSubject extends WorkSubject> =
  GetRunnerTaskModel<TSubject>['errorCode']

export type RunnerTaskInvocation<TInput> = {
  input: TInput
  messagePort: WorkerMessagePort
}

export type RunnerTaskJsonValue =
  | string
  | number
  | boolean
  | null
  | readonly RunnerTaskJsonValue[]
  | { readonly [key: string]: RunnerTaskJsonValue }

/** Worker 通信中的错误详情必须保持为可结构化克隆、可 JSON 序列化的普通数据。 */
export type RunnerTaskErrorDetails = Readonly<Record<string, RunnerTaskJsonValue>>

export type WorkerMessage =
  | {
      type: 'log'
      level: 'debug' | 'info' | 'warn' | 'error'
      message: string
      data?: RunnerTaskErrorDetails
    }
  | {
      type: 'progress'
      value: number
      message?: string
    }
  | {
      type: 'result'
      data: RunnerTaskJsonValue
    }
  | {
      type: 'error'
      error: RunnerTaskError
    }

export interface WorkerMessagePort {
  postMessage(message: WorkerMessage): void
  close(): void
}

export type RunnerTaskError<TCode extends string = string> = {
  code: TCode
  /** 仅供服务端诊断，不应直接作为 HTTP 响应文案。 */
  message: string
  details?: RunnerTaskErrorDetails
  cause?: unknown
}

export type RunnerTaskResult<TData, TCode extends string = string> =
  | { ok: true; data: TData }
  | { ok: false; error: RunnerTaskError<TCode> }

export type RunnerTaskRunResult<TSubject extends WorkSubject> = RunnerTaskResult<
  RunnerTaskOutput<TSubject>,
  RunnerTaskErrorCode<TSubject>
>

export type RunnerTaskRunOptions = {
  signal?: AbortSignal
  transferList?: Transferable[]
}

export interface AppWorkRunner {
  run<TSubject extends WorkSubject>(
    task: RunnerTaskParams<TSubject>,
    options?: RunnerTaskRunOptions,
  ): Promise<RunnerTaskRunResult<TSubject>>
  shutdown(): Promise<void>
}

// 已识别的公共 Worker 错误 Code 由具体任务与业务错误 Code 组合：
// 队列满、任务超时、Worker 暂不可用等返回失败 DTO；
// 未识别的 Piscina 异常和程序缺陷仍保持 Promise rejection，不能在此兜底吞掉。
