import { Link } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import {
  ArrowFatUpIcon,
  ArrowsClockwiseIcon,
  CircleNotchIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { AccountMenu } from '#/modules/auth/components/AccountMenu'
import { useSession } from '#/modules/auth/hooks/session'
import { NavBar } from '#/modules/board/components/NavBar'
import { SourceSearchDialog } from '#/modules/board/components/SourceSearchDialog'
import { useBoardSync } from '#/modules/board/hooks/preferences'
import { currentSourceIdsAtom } from '#/modules/board/stores'
import { refreshSources, useSourcesFetching } from '#/modules/sources/hooks/api-hooks'
import { ToastViewport } from '#/shared/feedback/components/ToastViewport'
import { useToast } from '#/shared/feedback/hooks/toast'
import { ScrollRootContext } from '#/shared/viewport/contexts/scroll-root'
import { Outlet } from '@tanstack/react-router'

const HOMEPAGE = 'https://github.com/oyolincc/fork-newsnow'
const SCROLL_SAMPLE_INTERVAL = 50
const TOP_BUTTON_THRESHOLD = 100
const SCROLL_SETTLE_DELAY = 500

function HeaderActions({ showTop, onTop }: { showTop: boolean; onTop: () => void }) {
  const queryClient = useQueryClient()
  const sourceIds = useAtomValue(currentSourceIdsAtom)
  const session = useSession()
  const toast = useToast()
  const fetching = useSourcesFetching(sourceIds)

  // 第一次打开和切换栏目都可以匿名查看；只有点“刷新全部”要求抓取最新新闻时，才检查是否需要登录。
  const refreshAll = async () => {
    if (session.loading) return
    if (session.enabled && !(await session.ensureAuthenticated())) {
      toast('登录后可以强制拉取最新数据', {
        type: 'warning',
        action: { label: '登录', run: session.login },
      })
      return
    }
    await refreshSources(queryClient, sourceIds)
  }
  return (
    <div className="flex items-center justify-self-end gap-2 text-xl text-primary-600 dark:text-primary">
      <button
        type="button"
        title="返回顶部"
        className={`btn hover:opacity-[.85] ${showTop ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
        onClick={onTop}>
        <ArrowFatUpIcon weight="duotone" />
      </button>
      <button
        type="button"
        title="刷新全部"
        className="btn opacity-50 hover:opacity-[.85]"
        onClick={() => void refreshAll()}>
        {fetching ? (
          <CircleNotchIcon className="animate-spin" weight="duotone" />
        ) : (
          <ArrowsClockwiseIcon weight="duotone" />
        )}
      </button>
      <button
        type="button"
        title="GitHub"
        className="btn opacity-50 hover:opacity-[.85]"
        onClick={() => window.open(HOMEPAGE)}>
        <GithubLogoIcon weight="duotone" />
      </button>
      <AccountMenu />
    </div>
  )
}

export function AppShell() {
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null)
  const [showTop, setShowTop] = useState(false)
  const lastScrollSample = useRef(0)
  const scrollTimer = useRef<number>(undefined)

  // 滚动事件一秒可能触发几十次。这里最多每 50ms 记录一次，并等滚动停下 500ms 后才显示或隐藏“回到顶部”。
  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const now = Date.now()
    if (now - lastScrollSample.current <= SCROLL_SAMPLE_INTERVAL) return
    lastScrollSample.current = now
    window.clearTimeout(scrollTimer.current)
    const element = event.currentTarget
    scrollTimer.current = window.setTimeout(
      () => setShowTop(element.scrollTop > TOP_BUTTON_THRESHOLD),
      SCROLL_SETTLE_DELAY,
    )
  }
  useEffect(() => () => window.clearTimeout(scrollTimer.current), [])
  useBoardSync()
  return (
    <>
      <div
        ref={setScrollElement}
        className="h-screen overflow-auto px-4 md:px-10 lg:px-24"
        onScroll={onScroll}>
        {/* 真正滚动的是这个 div，不是浏览器 window；拖拽自动滚动和“回到顶部”都要拿到它。 */}
        <ScrollRootContext.Provider value={scrollElement}>
          <header className="sticky top-0 z-10 grid grid-cols-[50px_auto_50px] items-center px-5 py-4 backdrop-blur-md lg:py-6">
            <div className="justify-self-start">
              <Link to="/" className="flex items-center gap-2">
                <span
                  className="h-10 w-10 bg-cover"
                  style={{ backgroundImage: 'url(/icon.svg)' }}
                />
                <span className="font-brand text-2xl leading-none">
                  <span className="block">News</span>
                  <span className="-mt-1 block">
                    <b className="text-primary-600">N</b>ow
                  </span>
                </span>
              </Link>
            </div>
            <div className="justify-self-center max-md:hidden">
              <NavBar />
            </div>
            <HeaderActions
              showTop={showTop}
              onTop={() => scrollElement?.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </header>
          <main className="mt-2 min-h-[calc(100vh-180px)]">
            <div className="mb-6 flex justify-center md:hidden">
              <NavBar />
            </div>
            <Outlet />
          </main>
        </ScrollRootContext.Provider>
      </div>
      <ToastViewport />
      <SourceSearchDialog />
    </>
  )
}
