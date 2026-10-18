import { fileURLToPath } from 'node:url'
import pandacss from '@pandacss/vite'
import { defineConfig } from 'vite-plus'

export default defineConfig({
  plugins: [
    pandacss({
      cwd: fileURLToPath(new URL('../', import.meta.url)),
      configPath: '.storybook/panda.config.ts',
    }),
  ],
  server: {
    warmup: {
      clientFiles: [fileURLToPath(new URL('../src/index.ts', import.meta.url))],
    },
  },
  resolve: {
    alias: [
      {
        find: /^@newsnow\/ui$/,
        replacement: fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      },
      {
        find: /^@newsnow\/ui\/tooltip$/,
        replacement: fileURLToPath(new URL('../src/Tooltip.tsx', import.meta.url)),
      },
      {
        find: 'styled-system',
        replacement: fileURLToPath(new URL('./styled-system', import.meta.url)),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('../src', import.meta.url)),
      },
    ],
  },
})
