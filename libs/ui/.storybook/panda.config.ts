import { defineConfig } from '@pandacss/dev'
import config from '../panda.config'

export default defineConfig({
  ...config,
  include: ['./src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  exclude: ['./.storybook/styled-system/**'],
  outdir: '.storybook/styled-system',
  // Controls choose values at runtime, beyond Panda's static JSX extraction.
  staticCss: {
    recipes: '*',
    css: [{ properties: { colorPalette: ['gray', 'lime', 'red', 'green'] } }],
  },
})
