import { defineConfig, type Plugin, lazyPlugins } from 'vite-plus'
import { packConfig } from '@oyolincc/dev-config'
import devServer from '@hono/vite-dev-server'
import nodeAdapter from '@hono/vite-dev-server/node'
import { loadEnvSync } from '@oyolincc/env-loader'
import path from 'node:path'
// import { builtinModules } from 'node:module'

const __dirname = import.meta.dirname
const isServe = !!process.env.VITE_PUBLIC_DEV_SERVE
const workersDir = path.resolve(__dirname, 'dist/workers')

function virtualWorkers(kind: 'dev' | 'pack'): Plugin {
  const virtualId = 'virtual:workers'
  const resolvedId = `\0${virtualId}`

  return {
    name: 'virtual-workers',
    resolveId(id) {
      if (id === virtualId) return resolvedId
      return null
    },
    load(id) {
      if (id !== resolvedId) return null
      // vp dev / test: Piscina cannot follow Vite's module graph; pack --watch writes dist/workers.
      if (kind === 'dev') {
        return `export default ${JSON.stringify(workersDir)}`
      }
      // vp pack: inlined into the server entry, so import.meta.dirname is dist/.
      return "import path from 'node:path'\nexport default path.join(import.meta.dirname, 'workers')"
    },
  }
}

export default defineConfig(() => {
  return {
    test: {
      clearMocks: false,
    },
    plugins: lazyPlugins(() => [
      virtualWorkers('dev'),
      {
        name: 'node-bootstrap',
        async configureServer() {
          loadEnvSync({
            preset: 'server',
          })
        },
      },
      devServer({
        entry: './src/adapters/nodejs/entry.ts',
        adapter: nodeAdapter(),
      }) as Plugin,
    ]),
    pack: {
      ...packConfig,
      plugins: [virtualWorkers('pack')],
      deps: {
        neverBundle: ['cloudflare:workers'],
      },
      entry: {
        ...(isServe
          ? {}
          : {
              nodejsMain: './src/adapters/nodejs/bootstrap.ts',
            }),
        nodejsEntry: './src/adapters/nodejs/entry.ts',
        cloudflareEntry: './src/adapters/cloudflare/entry.ts',
        // Enable this entry together with PiscinaWorkRunner in the Node.js adapter.
        // 'workers/example-worker': './src/infra/work-runner/example/worker-entry.ts',
      },
      // deps: {
      //   neverBundle: [...builtinModules],
      // },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@error-categories': path.resolve(__dirname, './src/shared/errors/defs/index.ts'),
      },
    },
    server: {
      port: Number(process.env.NODE_PORT) || 6464,
      host: true,
    },
  }
})
