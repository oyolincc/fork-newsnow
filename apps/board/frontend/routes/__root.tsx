import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HeadContent, Navigate, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Provider as JotaiProvider, type createStore } from 'jotai'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'
import { AppShell } from '#/app/components/AppShell'
import { SessionProvider } from '#/modules/auth/components/SessionProvider'
import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  store: ReturnType<typeof createStore>
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'NewsNow',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/icon.svg' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <Navigate to="/" />,
  shellComponent: RootDocument,
})

// TODO: 本期不迁移 PWA version、OG/sitemap/sw 等部署资源；品牌资源和 source pinyin 已接入，“更新”栏目按需求删除。

function RootComponent() {
  const { queryClient, store } = Route.useRouteContext()
  return (
    <QueryClientProvider client={queryClient}>
      {/* 不传 store 时，服务端所有访问者会共用 Jotai 的默认数据；这里改用当前页面刚创建的独立 store。 */}
      <JotaiProvider store={store}>
        <SessionProvider>
          <AppShell />
        </SessionProvider>
      </JotaiProvider>
      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </QueryClientProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}
