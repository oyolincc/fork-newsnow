import type { NewsItem } from '@newsnow/definition/frontend'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRelativeTime } from '#/shared/data/hooks/relative-time'

const RANK_DIFF_DURATION = 5_000

// 新闻右侧的补充内容可能是一段文字，也可能是站点图标；图片加载失败时直接隐藏，不留下破图标记。
function ExtraInfo({ item }: { item: NewsItem }) {
  if (item.extra?.info) return <>{item.extra.info}</>
  if (!item.extra?.icon) return null
  const icon =
    typeof item.extra.icon === 'string' ? { url: item.extra.icon, scale: 1 } : item.extra.icon
  return (
    <img
      src={icon.url}
      style={{ transform: `scale(${icon.scale || 1})` }}
      className="-mt-1 inline h-4"
      referrerPolicy="no-referrer"
      onError={(event) => {
        event.currentTarget.style.display = 'none'
      }}
    />
  )
}

function RankDiff({ value }: { value: number }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), RANK_DIFF_DURATION)
    return () => window.clearTimeout(timer)
  }, [value])
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 0.5, y: -7 }}
          exit={{ opacity: 0, y: -15 }}
          className={`absolute left-0 text-xs ${value < 0 ? 'text-green-500' : 'text-red-500'}`}>
          {value > 0 ? `+${value}` : value}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function MobileAwareLink({
  item,
  mobile,
  children,
  className,
}: {
  item: NewsItem
  mobile: boolean
  children: React.ReactNode
  className: string
}) {
  // 手机优先打开 mobileUrl，没有手机地址再用普通 url；电脑始终使用普通 url。
  return (
    <a
      href={mobile ? item.mobileUrl || item.url : item.url}
      target="_blank"
      rel="noopener noreferrer"
      title={item.extra?.hover}
      className={className}>
      {children}
    </a>
  )
}

export function HotNewsList({ items, mobile }: { items: NewsItem[]; mobile: boolean }) {
  // 热榜左侧显示第几名；如果名次刚变化，再显示 5 秒的上升或下降数字。
  return (
    <ol className="flex flex-col gap-2">
      {items.map((item, index) => (
        <li key={item.id} className="relative">
          <MobileAwareLink
            item={item}
            mobile={mobile}
            className="flex items-stretch gap-2 rounded-md pr-1 transition-all hover:bg-neutral-400/10 visited:text-neutral-400">
            <span className="flex min-w-6 items-center justify-center rounded-md bg-neutral-400/10 text-sm">
              {index + 1}
            </span>
            {!!item.extra?.diff && <RankDiff key={item.extra.diff} value={item.extra.diff} />}
            <span className="self-start leading-normal">
              <span className="mr-2 text-base">{item.title}</span>
              <span className="align-middle text-xs text-neutral-400/80">
                <ExtraInfo item={item} />
              </span>
            </span>
          </MobileAwareLink>
        </li>
      ))}
    </ol>
  )
}

function TimelineTime({ value }: { value: string | number }) {
  return <>{useRelativeTime(value)}</>
}

export function TimelineNewsList({ items, mobile }: { items: NewsItem[]; mobile: boolean }) {
  // 同一个新闻 ID 可能在不同时间再次发布，把日期也放进 React key，避免 React 把两次发布误当成同一行。
  return (
    <ol className="ml-1 flex flex-col border-s border-neutral-400/50">
      {items.map((item) => {
        const date = item.pubDate || item.extra?.date
        return (
          <li key={`${item.id}-${date || ''}`} className="flex flex-col">
            <span className="-ml-px flex items-center gap-1 text-neutral-400/50">
              <span>-</span>
              <span className="text-xs text-neutral-400/80">
                {date && <TimelineTime value={date} />}
              </span>
              <span className="text-xs text-neutral-400/80">
                <ExtraInfo item={item} />
              </span>
            </span>
            <MobileAwareLink
              item={item}
              mobile={mobile}
              className="ml-2 cursor-pointer rounded-md px-1 transition-all hover:bg-neutral-400/10 visited:text-neutral-400/80">
              {item.title}
            </MobileAwareLink>
          </li>
        )
      })}
    </ol>
  )
}
