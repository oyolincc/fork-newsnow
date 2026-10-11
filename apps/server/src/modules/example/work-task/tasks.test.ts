import { MessageChannel } from 'node:worker_threads'
import { describe, expect, it } from 'vite-plus/test'
import { executeExampleTask } from './tasks'

describe('Example worker task', () => {
  it('normalizes a message and reports progress', async () => {
    const { port1, port2 } = new MessageChannel()
    const messages: unknown[] = []
    port1.on('message', (message) => messages.push(message))
    const result = await executeExampleTask({ message: '  hello   worker  ' }, port2)
    await new Promise<void>((resolve) => setImmediate(resolve))

    expect(result).toEqual({
      ok: true,
      data: { original: '  hello   worker  ', normalized: 'hello worker', length: 12 },
    })
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'log' }),
        expect.objectContaining({ type: 'progress', value: 100 }),
        expect.objectContaining({ type: 'result' }),
      ]),
    )
    port1.close()
    port2.close()
  })

  it('serializes a business exception and reports it', async () => {
    const { port1, port2 } = new MessageChannel()
    const messages: unknown[] = []
    port1.on('message', (message) => messages.push(message))
    const result = await executeExampleTask({ message: '  ' }, port2)
    await new Promise<void>((resolve) => setImmediate(resolve))

    expect(result).toEqual({
      ok: false,
      error: {
        code: 'EXAMPLE_PROCESS_FAILED',
        message: 'Message must not be empty',
        details: { field: 'message' },
      },
    })
    expect(messages).toEqual(expect.arrayContaining([expect.objectContaining({ type: 'error' })]))
    port1.close()
    port2.close()
  })
})
