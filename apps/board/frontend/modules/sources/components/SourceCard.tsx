import { sourceCatalog, type SourceID } from '@newsnow/definition/frontend'
import {
  ArrowsClockwiseIcon,
  CircleNotchIcon,
  DotsSixVerticalIcon,
  StarIcon,
} from '@phosphor-icons/react'
import { useInView } from 'framer-motion'
import { useQueryClient } from '@tanstack/react-query'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useSession } from '#/modules/auth/hooks/session'
import { useRelativeTime } from '#/shared/data/hooks/relative-time'
import { useToast } from '#/shared/feedback/hooks/toast'
import { MOBILE_MEDIA_QUERY } from '#/shared/viewport/constants'
import { useMedia } from '#/shared/viewport/hooks/media'
import { refreshSources, useSourceItems } from '../hooks/api-hooks'
import { HotNewsList, TimelineNewsList } from './NewsList'

type SourceCardProps = React.HTMLAttributes<HTMLDivElement> & {
  sourceId: SourceID
  dragging?: boolean
  focused?: boolean
  onToggleFocus?: () => void
  setHandleRef?: (element: HTMLElement | null) => void
}

const SourceColorClasses: Record<string, { background: string; text: string }> = {
  blue: { background: 'bg-blue-500/40 dark:bg-blue-500/40', text: 'text-blue-500' },
  gray: { background: 'bg-gray-500/40 dark:bg-gray-500/40', text: 'text-gray-500' },
  green: { background: 'bg-green-500/40 dark:bg-green-500/40', text: 'text-green-500' },
  orange: { background: 'bg-orange-500/40 dark:bg-orange-500/40', text: 'text-orange-500' },
  red: { background: 'bg-red-500/40 dark:bg-red-500/40', text: 'text-red-500' },
  slate: { background: 'bg-slate-500/40 dark:bg-slate-500/40', text: 'text-slate-500' },
}

// 拖拽预览和正常卡片的这块标题长得一样，所以放在一起；正常卡片的图标可以点进来源网站，预览不能点。
function SourceIdentity({
  sourceId,
  status,
  linked = false,
}: {
  sourceId: SourceID
  status: string
  linked?: boolean
}) {
  const source = sourceCatalog[sourceId]
  const colors = SourceColorClasses[source.color] || SourceColorClasses.slate
  const iconClass = 'h-8 w-8 rounded-full bg-cover'
  const backgroundImage = `url(/icons/${sourceId.split('-')[0]}.png)${linked ? ', url(/icons/default.png)' : ''}`
  return (
    <div className="flex items-center gap-2">
      {linked ? (
        <a
          className={iconClass}
          target="_blank"
          rel="noreferrer"
          href={source.home}
          title={'desc' in source && typeof source.desc === 'string' ? source.desc : undefined}
          style={{ backgroundImage }}
        />
      ) : (
        <span className={iconClass} style={{ backgroundImage }} />
      )}
      <span className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="text-xl font-bold">{source.name}</span>
          {'title' in source && source.title && (
            <span
              className={`rounded bg-zinc-200/50 px-1 text-sm ${linked ? 'dark:bg-zinc-800/50' : ''} ${colors.text}`}>
              {source.title}
            </span>
          )}
        </span>
        <span className="text-xs opacity-70">{status}</span>
      </span>
    </div>
  )
}

export function SourceCardPreview({ sourceId, rounded }: { sourceId: SourceID; rounded: boolean }) {
  const source = sourceCatalog[sourceId]
  const colors = SourceColorClasses[source.color] || SourceColorClasses.slate

  // 屏幕外的卡片先只画外壳，滚动到附近时才请求新闻并生成列表，避免首页一次渲染几十个列表。
  return (
    <div
      className={`flex flex-col bg-zinc-200 p-4 backdrop-blur-md dark:bg-zinc-800 ${colors.background} ${rounded ? 'rounded-2xl' : ''}`}>
      <div className="mx-2 flex items-center justify-between">
        <SourceIdentity sourceId={sourceId} status="拖拽中" />
        <DotsSixVerticalIcon
          className={`cursor-grabbing text-lg ${colors.text}`}
          weight="duotone"
        />
      </div>
    </div>
  )
}

export const SourceCard = forwardRef<HTMLElement, SourceCardProps>(function SourceCard(
  { sourceId, dragging, focused, onToggleFocus, setHandleRef, style, ...props },
  forwardedRef,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const visible = useInView(rootRef, { once: true })
  useImperativeHandle(forwardedRef, () => rootRef.current!)
  const source = sourceCatalog[sourceId]
  const colors = SourceColorClasses[source.color] || SourceColorClasses.slate
  return (
    <div
      ref={rootRef}
      className={`flex h-[500px] flex-col rounded-2xl p-4 transition-opacity duration-300 ${colors.background} ${dragging ? 'opacity-50' : ''}`}
      style={{ transformOrigin: '50% 50%', ...style }}
      {...props}>
      {visible && (
        <SourceCardContent
          sourceId={sourceId}
          focused={focused}
          onToggleFocus={onToggleFocus}
          setHandleRef={setHandleRef}
        />
      )}
    </div>
  )
})

function SourceCardContent({
  sourceId,
  focused,
  onToggleFocus,
  setHandleRef,
}: Pick<SourceCardProps, 'sourceId' | 'focused' | 'onToggleFocus' | 'setHandleRef'>) {
  const source = sourceCatalog[sourceId]
  const query = useSourceItems(sourceId)
  const queryClient = useQueryClient()
  const session = useSession()
  const toast = useToast()
  const mobile = useMedia(MOBILE_MEDIA_QUERY)
  const updated = useRelativeTime(query.data?.updatedAt)

  // 自动加载可以匿名进行；用户点刷新按钮会要求服务端重新抓取新闻，所以此时才确认登录态。
  const refreshSource = async () => {
    if (session.loading) return
    if (session.enabled && !(await session.ensureAuthenticated())) {
      toast('登录后可以强制拉取最新数据', {
        type: 'warning',
        action: { label: '登录', run: session.login },
      })
      return
    }
    await refreshSources(queryClient, [sourceId])
  }
  const hottest = 'type' in source && source.type === 'hottest'
  const loading = query.isFetching
  const colors = SourceColorClasses[source.color] || SourceColorClasses.slate
  return (
    <>
      <div className="mx-2 mb-2 flex items-center justify-between">
        <SourceIdentity
          sourceId={sourceId}
          linked
          status={query.isError ? '获取失败' : updated ? `${updated}更新` : '加载中...'}
        />
        <div className={`flex gap-2 text-lg ${colors.text}`}>
          <button
            type="button"
            aria-label="刷新"
            className="btn opacity-50 hover:opacity-[.85]"
            onClick={() => void refreshSource()}>
            {loading ? (
              <CircleNotchIcon className="animate-spin" weight="duotone" />
            ) : (
              <ArrowsClockwiseIcon weight="duotone" />
            )}
          </button>
          {onToggleFocus && (
            <button
              type="button"
              aria-label={focused ? '取消关注' : '关注'}
              className="btn opacity-50 hover:opacity-[.85]"
              onClick={onToggleFocus}>
              <StarIcon weight={focused ? 'fill' : 'duotone'} />
            </button>
          )}
          {setHandleRef && (
            <span
              ref={setHandleRef}
              aria-label="拖拽排序"
              className="btn cursor-grab opacity-50 hover:opacity-[.85]">
              <DotsSixVerticalIcon weight="duotone" />
            </span>
          )}
        </div>
      </div>
      <div
        className={`h-full overflow-y-auto rounded-2xl bg-zinc-200/70 p-2 dark:bg-zinc-800/70 ${loading ? 'animate-pulse' : ''}`}>
        <div className={`transition-opacity duration-500 ${loading ? 'opacity-20' : ''}`}>
          {/* 服务端抓取失败后会返回数据库里的旧内容；显示这句话，避免用户误以为它刚刚更新。 */}
          {query.data?.stale && (
            <p className="mb-2 text-xs text-orange-600">实时抓取失败，当前显示旧快照</p>
          )}
          {query.data?.items?.length ? (
            hottest ? (
              <HotNewsList items={query.data.items} mobile={mobile} />
            ) : (
              <TimelineNewsList items={query.data.items} mobile={mobile} />
            )
          ) : null}
        </div>
      </div>
    </>
  )
}
