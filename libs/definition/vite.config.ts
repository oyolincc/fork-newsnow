import { defineConfig } from 'vite-plus'
import { packConfig } from '@oyolincc/dev-config'

export default defineConfig({
  pack: {
    ...packConfig,
    entry: {
      frontend: 'src/frontend.ts',
      backend: 'src/backend.ts',
    },
    exports: true,
  },
})
