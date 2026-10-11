import { defineConfig, lazyPlugins, type PluginOption, type UserConfig } from "vite-plus";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import path from "node:path";

const build = {
  rolldownOptions: {
    onwarn(warning, defaultHandler) {
      // 普通 SSR 不消费 RSC 边界，仅忽略依赖中的 use client 指令警告。
      if (
        warning.code === "MODULE_LEVEL_DIRECTIVE" &&
        warning.id?.split(/[\\/]/).includes("node_modules") &&
        /["']use client["']/.test(warning.message)
      ) {
        return;
      }
      defaultHandler(warning);
    },
  },
} satisfies NonNullable<UserConfig["build"]>;

export default defineConfig(() => {
  const deployTarget = process.env.DEPLOY_TARGET || "node";
  if (deployTarget !== "node" && deployTarget !== "cloudflare") {
    throw new Error(`DEPLOY_TARGET must be "node" or "cloudflare", received: ${deployTarget}`);
  }
  const serverExternal = /^@newsnow\/server(?:\/|$)/;

  return {
    ...(deployTarget === "node"
      ? {
          environments: {
            ssr: {
              resolve: {
                // 拦住第一次：Vite/TanStack SSR bundle
                external: ["@newsnow/server/nodejs"],
              },
            },
          },
        }
      : {
          environments: {
            ssr: {
              resolve: {
                mainFields: ["browser", "module", "jsnext:main", "jsnext"],
              },
            },
          },
        }),
    server: {
      port: 3000,
      warmup: {
        clientFiles: ["./frontend/router.tsx"],
        ssrFiles: ["./frontend/router.tsx"],
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    resolve: {
      tsconfigPaths: true,
      alias: {
        "#server-runtime": path.resolve(import.meta.dirname, `./backend/${deployTarget}.ts`),
      },
    },
    optimizeDeps: { include: ["@newsnow/definition/frontend"] },
    build,
    plugins: lazyPlugins(async () => {
      const runtimePlugins =
        deployTarget === "cloudflare"
          ? [
              (await import("@cloudflare/vite-plugin")).cloudflare({
                viteEnvironment: { name: "ssr" },
                persistState: {
                  path: path.resolve(import.meta.dirname, "../../.wrangler/state"),
                },
              }),
            ]
          : (await import("nitro/vite")).nitro({
              preset: "node_server",
              serverDir: "./nitro",
              // 拦住第二次：Nitro 最终 server bundle
              rollupConfig: {
                external: [serverExternal],
                onwarn: build.rolldownOptions.onwarn,
              },
            });

      const pluginOptions = [
        ...runtimePlugins,
        ...tanstackStart({ srcDirectory: "./frontend" }),
        ...tailwindcss(),
        ...viteReact(),
      ] as PluginOption[];
      return pluginOptions;
    }),
  };
});
