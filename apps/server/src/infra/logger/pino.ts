import { createRequire } from 'node:module'
import { isAbsolute, join, resolve } from 'node:path'
import { type Runtime } from 'hono/adapter'
import { pinoLogger } from 'hono-pino'
import pino, { type LoggerOptions } from 'pino'
import type { AppConfig } from '@/shared/app/types'
import { serializeErr } from '@/shared/errors/log'

// const pinoInstance = pino({
//   hooks: {
//     logMethod(args: any[], method) {
//       if (
//         args.length !== 2 ||
//         args[0] instanceof Error ||
//         typeof args[1] !== 'string'
//       ) {
//         return method.apply(this, args)
//       }
//       const firstArg = args[0]
//       if (firstArg && typeof firstArg === 'object') {
//         const { context, ...rest } = firstArg
//         const arg1: any = { p: rest }
//         if (context) arg1.context = context
//         return method.apply(this, [{}, args[1]])
//       }
//       return method.apply(this, args)
//     },
//   },
// })

export const createPinoOptions = ({
  isLocal,
  baseConfig,
}: {
  isLocal: boolean
  baseConfig: AppConfig['log']['base']
}) => {
  const pinoOptions: LoggerOptions = {
    level: baseConfig.loggerLevel || (isLocal ? 'debug' : 'info'),
    browser: {
      asObject: true,
      serialize: ['!stdSerializers.err', 'req', 'res', 'err'],
    },
    serializers: {
      req: (req) => {
        return {
          method: req.method,
          url: req.url,
          headers: {
            'content-type': req.headers?.['content-type'],
            'user-agent': req.headers?.['user-agent'],
            referer: req.headers?.['referer'],
          },
        }
      },
      res: (res) => {
        return {
          status: res.status,
          headers: {
            'content-type': res.headers?.['content-type'],
            'content-length': res.headers?.['content-length'],
          },
        }
      },
      err: serializeErr,
    },
  }

  return pinoOptions
}

export const createPinoLogger = ({
  isLocal,
  logBase,
  runtime,
  logRoll,
  logPretty,
}: {
  isLocal: boolean
  logBase: AppConfig['log']['base']
  runtime: Runtime
  logRoll?: AppConfig['log']['roll']
  logPretty?: AppConfig['log']['pretty']
}) => {
  const pinoOptions = createPinoOptions({ isLocal, baseConfig: logBase })
  const level = pinoOptions.level
  if (runtime === 'node' || runtime === 'bun') {
    if (isLocal && logPretty) {
      try {
        createRequire(import.meta.url).resolve('pino-pretty')
        pinoOptions.transport = { target: 'pino-pretty', level, options: logPretty }
      } catch {
        console.warn('[logger] pino-pretty is not installed; falling back to JSON stdout')
      }
    } else if (logRoll) {
      const { loggerDir, loggerFileBase } = logRoll
      pinoOptions.transport = {
        targets: [
          {
            target: 'pino-roll',
            level,
            options: {
              ...logRoll,
              file: join(
                isAbsolute(loggerDir) ? loggerDir : resolve(process.cwd(), loggerDir),
                loggerFileBase,
              ),
            },
          },
          { target: 'pino/file', level, options: { destination: 1 } },
        ],
      }
    }
  }
  const rootLogger = pino(pinoOptions)
  const loggerHandler = pinoLogger({
    pino: rootLogger,
    // access log 只记请求完成；错误细节由 onError 走 serializers.err。
    // 默认在 c.error 时升 error 且 msg=error.message，会打出一条无结构的重复 error。
    http: {
      onResLevel: () => 'info',
      onResMessage: () => 'Request completed',
    },
  })
  return { rootLogger, loggerHandler }
}
