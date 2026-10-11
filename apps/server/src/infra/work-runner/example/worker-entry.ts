/** WORKER 打包入口 */
import type { RunnerTaskInvocation } from '../types'
import {
  executeExampleTask as runExampleTask,
  type ExampleRunnerTaskModel,
} from '@/modules/example/work-task/tasks'

export function executeExampleTask({
  input,
  messagePort,
}: RunnerTaskInvocation<ExampleRunnerTaskModel['input']>): ReturnType<typeof runExampleTask> {
  return runExampleTask(input, messagePort).finally(() => messagePort.close())
}
