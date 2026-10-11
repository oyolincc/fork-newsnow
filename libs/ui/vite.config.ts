import { defineConfig } from 'vite-plus'
import { packConfig } from '@oyolincc/dev-config'

export default defineConfig({
  pack: {
    ...packConfig,
    exports: true,
  },
})
