import { defineConfig } from 'vite-plus'
import { packConfig } from '@oyolincc/dev-config'

export default defineConfig({
  pack: {
    ...packConfig,
    entry: {
      index: 'src/index.ts',
      schema: 'src/schema/index.ts',
    },
    exports: true,
  },
})
