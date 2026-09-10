import { createRequire } from 'node:module'
import { isAbsolute, join, resolve } from 'node:path'
import type { Runtime } from 'hono/adapter'
import { pinoLogger } from 'hono-pino'
import pino, { type LoggerOptions } from 'pino'
import type { AppConfig } from '@/hono/shared/app/types'
import { serializeErr } from '@/hono/shared/errors/log'

export const createPinoOptions = ({ isLocal }: { isLocal: boolean }) => {
  const pinoOptions: LoggerOptions = {
    level: isLocal ? 'debug' : 'info',
    serializers: {
      req: (req) => {
        return {
          method: req.method,
          url: req.url,
          headers: {
            'content-type': req.headers?.['content-type'],
            'user-agent': req.headers?.['user-agent'],
            referer: req.headers?.referer,
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
  runtime,
  logRoll,
  logPretty,
}: {
  isLocal: boolean
  runtime: Runtime
  logRoll?: AppConfig['log']['roll']
  logPretty?: AppConfig['log']['pretty']
}) => {
  const pinoOptions = createPinoOptions({ isLocal })
  if (runtime === 'node' || runtime === 'bun') {
    if (isLocal && logPretty) {
      try {
        createRequire(import.meta.url).resolve('pino-pretty')
        pinoOptions.transport = { target: 'pino-pretty', options: logPretty }
      } catch {
        console.warn('[logger] pino-pretty is not installed; falling back to JSON stdout')
      }
    } else if (logRoll) {
      const { loggerDir, loggerFileBase } = logRoll
      pinoOptions.transport = {
        targets: [
          {
            target: 'pino-roll',
            options: {
              ...logRoll,
              file: join(
                isAbsolute(loggerDir) ? loggerDir : resolve(process.cwd(), loggerDir),
                loggerFileBase,
              ),
            },
          },
          { target: 'pino/file', options: { destination: 1 } },
        ],
      }
    }
  }
  const rootLogger = pino(pinoOptions)
  const loggerHandler = pinoLogger({
    pino: rootLogger,
    http: { onResLevel: () => 'info', onResMessage: () => 'Request completed' },
  })
  return { rootLogger, loggerHandler }
}
