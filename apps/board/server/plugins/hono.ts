import { definePlugin } from 'nitro'
import { sqliteClient } from '@/hono/adapters/nodejs/entry'

export default definePlugin((nitro) => {
  nitro.hooks.hook('close', () => sqliteClient.close())
})
