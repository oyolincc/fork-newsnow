import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export function ensureDatabaseDirectory(databaseFile: string): void {
  if (!databaseFile || databaseFile === ':memory:') return

  mkdirSync(dirname(databaseFile), { recursive: true })
}
