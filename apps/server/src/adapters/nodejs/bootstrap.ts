import { serve } from '@hono/node-server'
import app, { closeNodeDependencies } from './entry'

function main() {
  const port = Number(process.env.NODE_PORT)
  if (!port || Number.isNaN(port)) {
    throw new Error(`Invalid port: ${process.env.NODE_PORT}`)
  }

  const server = serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`)
    },
  )

  let isShuttingDown = false

  const gracefulShutdown = async (signal: string) => {
    if (isShuttingDown) return
    isShuttingDown = true

    console.log(`Received ${signal}, shutting down...`)

    // 设置保底超时：5 秒后强制退出，防止卡死
    const forceExitTimeout = setTimeout(() => {
      console.error('Forced exit: Shutdown timed out.')
      process.exit(1)
    }, 5000)
    forceExitTimeout.unref()

    try {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()))
      })
      console.log('✔ HTTP server successfully closed.')

      await closeNodeDependencies()
      console.log('✔ Node dependencies successfully closed.')

      console.log('Graceful shutdown completed.')
      process.exit(0)
    } catch (err) {
      console.error('Error during shutdown:', err)
      process.exit(1)
    }
  }

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  process.on('SIGINT', () => gracefulShutdown('SIGINT'))
}

try {
  main()
} catch (error) {
  console.error('[server] failed to start', error)
  process.exit(1)
}
