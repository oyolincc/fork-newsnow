import { defineConfig } from 'vite-plus'
import { packConfig } from '@oyolincc/dev-config'
import {
  isUseClientDirectiveWarning,
  type BundlerLog,
  type BundlerLogHandler,
  type BundlerLogLevel,
} from '../../tooling/bundler-warnings'

export default defineConfig({
  pack: {
    ...packConfig,
    entry: ['src/index.ts', 'src/Tooltip.tsx'],
    tsconfig: './tsconfig.build.json',
    exports: false,
    // Keep each component's RSC boundary in its own output module.
    unbundle: true,
    root: '.',
    outDir: 'dist/react',
    platform: 'neutral',
    fixedExtension: true,
    deps: {
      onlyBundle: [],
    },
    inputOptions: {
      onLog(level: BundlerLogLevel, log: BundlerLog, defaultHandler: BundlerLogHandler) {
        // Unbundle preserves this directive in each emitted module.
        if (level === 'warn' && isUseClientDirectiveWarning(log)) return
        defaultHandler(level, log)
      },
    },
  },
})
