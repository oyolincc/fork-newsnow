import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'
import { isUseClientDirectiveWarning } from '../../../tooling/bundler-warnings'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: fileURLToPath(new URL('./vite.config.ts', import.meta.url)),
      },
    },
  },
  viteFinal(config) {
    config.build = {
      ...config.build,
      rolldownOptions: {
        ...config.build?.rolldownOptions,
        onLog(level, log, defaultHandler) {
          // Storybook runs entirely in the browser and does not need RSC boundaries.
          if (level === 'warn' && isUseClientDirectiveWarning(log)) return
          defaultHandler(level, log)
        },
      },
    }
    return config
  },
}

export default config
