import { defineConfig, lazyPlugins, type PluginOption, type UserConfig } from 'vite-plus'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import pandacss from '@pandacss/vite'
import viteReact from '@vitejs/plugin-react'
import path from 'node:path'
import {
  isUseClientDirectiveWarning,
  type BundlerLog,
  type BundlerLogHandler,
  type BundlerLogLevel,
} from '../../tooling/bundler-warnings'

const build = {
  rolldownOptions: {
    onLog(level: BundlerLogLevel, log: BundlerLog, defaultHandler: BundlerLogHandler) {
      // 普通 SSR 不消费 RSC 边界，仅忽略依赖中的 use client 指令警告。
      if (
        level === 'warn' &&
        isUseClientDirectiveWarning(log) &&
        log.id?.split(/[\\/]/).includes('node_modules')
      )
        return
      defaultHandler(level, log)
    },
  },
} satisfies NonNullable<UserConfig['build']>

export default defineConfig(() => {
  const deployTarget = process.env.DEPLOY_TARGET || 'node'
  if (deployTarget !== 'node' && deployTarget !== 'cloudflare') {
    throw new Error(`DEPLOY_TARGET must be "node" or "cloudflare", received: ${deployTarget}`)
  }
  const serverExternal = /^@newsnow\/server(?:\/|$)/

  return {
    ...(deployTarget === 'node'
      ? {
          environments: {
            ssr: {
              resolve: {
                // 拦住第一次：Vite/TanStack SSR bundle
                external: ['@newsnow/server/nodejs'],
              },
            },
          },
        }
      : {
          environments: {
            ssr: {
              resolve: {
                mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
              },
            },
          },
        }),
    server: {
      port: 3000,
      warmup: {
        // 预热临时 UI 验收页的转换；移除 routes/ui 后此 glob 自动不再匹配文件。
        clientFiles: ['./frontend/router.tsx', './frontend/routes/ui/**/*.tsx'],
        ssrFiles: ['./frontend/router.tsx', './frontend/routes/ui/**/*.tsx'],
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    resolve: {
      tsconfigPaths: true,
      alias: {
        '#server-runtime': path.resolve(import.meta.dirname, `./backend/${deployTarget}.ts`),
      },
    },
    optimizeDeps: { include: ['@newsnow/definition/frontend'] },
    build,
    plugins: lazyPlugins(async () => {
      const runtimePlugins =
        deployTarget === 'cloudflare'
          ? [
              (await import('@cloudflare/vite-plugin')).cloudflare({
                viteEnvironment: { name: 'ssr' },
                persistState: {
                  path: path.resolve(import.meta.dirname, '../../.wrangler/state'),
                },
              }),
            ]
          : [
              {
                name: 'stack:server-runtime-reload',
                apply: 'serve' as const,
                configResolved(config) {
                  config.configFileDependencies.push(
                    path.resolve(import.meta.dirname, '../server/dist/nodejsEntry.mjs'),
                  )
                },
              } satisfies PluginOption,
              ...(await import('nitro/vite')).nitro({
                preset: 'node_server',
                serverDir: './nitro',
                // 拦住第二次：Nitro 最终 server bundle
                rollupConfig: {
                  external: [serverExternal],
                  onLog: build.rolldownOptions.onLog,
                },
              }),
            ]

      const pluginOptions = [
        ...runtimePlugins,
        pandacss(),
        ...tanstackStart({ srcDirectory: './frontend' }),
        ...viteReact(),
      ] as PluginOption[]
      return pluginOptions
    }),
  }
})
