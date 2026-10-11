import { defineConfig } from 'vite-plus'
import { lintConfig, fmtConfig } from '@oyolincc/dev-config'

export default defineConfig({
  create: { defaultTemplate: '@oyolincc' },
  staged: {
    '*': 'vp check --fix',
  },
  fmt: fmtConfig,
  lint: lintConfig,
  run: {
    cache: false,
  },
})
