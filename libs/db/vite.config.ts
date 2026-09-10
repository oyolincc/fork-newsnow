import { defineConfig } from 'vite-plus'
import { packConfig } from '@oyolincc/dev-config'
import path from 'node:path'

const __dirname = import.meta.dirname

export default defineConfig({
  pack: {
    ...packConfig,
    entry: {
      'sqlite/schema': 'src/dialects/sqlite/schema/index.ts',
      'sqlite/sqlite': 'src/dialects/sqlite/client.ts',
    },
    exports: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
