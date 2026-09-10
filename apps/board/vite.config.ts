import { defineConfig } from 'vite-plus'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    nitro({
      serverDir: './server',
      handlers: [
        {
          route: '/api/**',
          handler: './server/hono/adapters/nodejs/entry.ts',
          middleware: false,
          lazy: false,
        },
      ],
    }),
    tanstackStart({
      srcDirectory: './frontend',
    }),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
})
