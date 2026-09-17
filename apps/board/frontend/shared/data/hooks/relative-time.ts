import { atom, useAtomValue } from 'jotai'
import { formatRelativeTime } from '../utils/relative-time'

const relativeTimeTickAtom = atom(0)
// 页面只开一个每分钟更新的定时器，所有“几分钟前”共用它；切到别的标签页后暂停更新以节省开销。
relativeTimeTickAtom.onMount = (setTick) => {
  const update = () => {
    if (document.visibilityState === 'visible') setTick(Date.now())
  }
  const timer = window.setInterval(update, 60_000)
  update()
  document.addEventListener('visibilitychange', update)
  return () => {
    window.clearInterval(timer)
    document.removeEventListener('visibilitychange', update)
  }
}

export function useRelativeTime(value?: number | string) {
  const tick = useAtomValue(relativeTimeTickAtom)
  return tick && value !== undefined ? formatRelativeTime(value) : ''
}
