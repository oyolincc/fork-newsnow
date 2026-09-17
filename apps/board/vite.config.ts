import { defineConfig } from 'vite-plus'
import { pinyin } from '@napi-rs/pinyin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { sourceCatalog } from '@newsnow/definition/frontend'
import { nitro } from 'nitro/vite'

export default defineConfig({
  define: {
    __SOURCE_SEARCH_INDEX__: JSON.stringify(
      Object.fromEntries(
        Object.entries(sourceCatalog)
          .filter(([, source]) => !('redirect' in source))
          .map(([id, source]) => [
            id,
            pinyin(
              'title' in source && source.title ? `${source.name}-${source.title}` : source.name,
            ).join(''),
          ]),
      ),
    ),
  },
  server: {
    port: 3000,
    warmup: {
      clientFiles: ['./frontend/router.tsx'],
      ssrFiles: ['./frontend/router.tsx'],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  // 依赖预构建（仅 dev）：Vite 会扫描源码自动发现大部分 npm 包，include 只补扫描器容易漏掉或
  // 需要提前打包的例外——不要把 package.json 里所有依赖都列进来。
  optimizeDeps: {
    include: [
      '@newsnow/definition/frontend',
      '@atlaskit/pragmatic-drag-and-drop',
      '@atlaskit/pragmatic-drag-and-drop-auto-scroll',
      '@atlaskit/pragmatic-drag-and-drop-hitbox',
    ],
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
    tailwindcss(),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
})
