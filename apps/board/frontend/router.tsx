import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { createStore } from 'jotai'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  // 服务端会同时处理很多访问者，所以每次创建页面都新建一份查询缓存和 Jotai 数据，不能让不同访问者共用。
  const queryClient = new QueryClient()
  const store = createStore()
  const router = createTanStackRouter({
    routeTree,
    context: { queryClient, store },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
