export type BundlerLogLevel = 'debug' | 'info' | 'warn'
export type BundlerLog = { code?: string; message: string; id?: string }
export type BundlerLogHandler = (level: BundlerLogLevel, log: BundlerLog) => void

export function isUseClientDirectiveWarning(log: BundlerLog): boolean {
  return log.code === 'MODULE_LEVEL_DIRECTIVE' && /["']use client["']/.test(log.message)
}
