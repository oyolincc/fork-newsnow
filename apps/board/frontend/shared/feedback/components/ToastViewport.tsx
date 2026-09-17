import { InfoIcon, XCircleIcon } from '@phosphor-icons/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'
import { toastsAtom, type ToastItem } from '../stores/toast'

const DEFAULT_TOAST_DURATION = 5_000

export function ToastViewport() {
  const items = useAtomValue(toastsAtom)
  const [parent] = useAutoAnimate({ duration: 200 })
  return (
    <ol
      ref={parent}
      className="fixed left-1/2 top-4 z-[100] flex w-80 -translate-x-1/2 flex-col gap-2">
      {items.map((item) => (
        <ToastMessage key={item.id} item={item} />
      ))}
    </ol>
  )
}

function ToastMessage({ item }: { item: ToastItem }) {
  const setToasts = useSetAtom(toastsAtom)
  const timer = useRef<number>(undefined)
  const started = useRef(0)
  const remaining = useRef(item.duration || DEFAULT_TOAST_DURATION)
  // 鼠标放上提示时暂停关闭，并记住还剩几秒；移开后从剩余时间继续，不会重新完整显示 5 秒。
  const dismiss = useCallback(
    (notify = true) => {
      setToasts((items) => items.filter(({ id }) => id !== item.id))
      if (notify) item.onDismiss?.()
    },
    [item, setToasts],
  )
  useEffect(() => {
    started.current = Date.now()
    timer.current = window.setTimeout(dismiss, remaining.current)
    return () => window.clearTimeout(timer.current)
  }, [dismiss])
  const pause = () => {
    window.clearTimeout(timer.current)
    remaining.current -= Date.now() - started.current
  }
  const resume = () => {
    started.current = Date.now()
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(dismiss, remaining.current)
  }

  // 错误、成功等提示只换背景色，关闭按钮和点击方式都保持一致。
  const colors = {
    error: 'bg-red-500/35',
    info: 'bg-blue-500/35',
    success: 'bg-green-500/35',
    warning: 'bg-orange-500/35',
  }
  return (
    <li
      className={`${colors[item.type]} flex items-center gap-2 rounded-lg p-2 shadow-xl backdrop-blur-md`}
      onMouseEnter={pause}
      onMouseLeave={resume}>
      <InfoIcon weight="duotone" />
      <span className="flex-1">{item.message}</span>
      {item.action && (
        <button
          type="button"
          className="rounded bg-zinc-200/60 px-2 text-sm dark:bg-zinc-800/60"
          onClick={item.action.run}>
          {item.action.label}
        </button>
      )}
      <button
        type="button"
        className="btn opacity-50 hover:opacity-[.85]"
        aria-label="关闭"
        onClick={() => dismiss(false)}>
        <XCircleIcon />
      </button>
    </li>
  )
}
