'use client'
import { useEffect, useState, useSyncExternalStore, type ComponentType, type JSX } from 'react'

export interface CreateOverlayProps<TReturn = unknown> {
  open?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  onExitComplete?: () => void
  setReturnValue?: (value: TReturn) => void
  setExitComplete?: () => void
}

export interface OverlayOptions<TProps extends object, TReturn = unknown> {
  props?: Partial<TProps> & CreateOverlayProps<TReturn>
}

export interface CreateOverlayReturn<TProps extends object, TReturn = unknown> {
  Viewport: () => JSX.Element
  open: (id: string, props: TProps) => Promise<TReturn | undefined>
  close: (id: string, value?: TReturn) => Promise<void>
  update: (id: string, props: Partial<TProps> & CreateOverlayProps<TReturn>) => void
  remove: (id: string) => void
  removeAll: () => void
  get: (id: string) => TProps & CreateOverlayProps<TReturn>
  has: (id: string) => boolean
  getSnapshot: () => (TProps & CreateOverlayProps<TReturn>)[]
  waitForExit: (id: string) => Promise<void>
}

export function createOverlay<TProps extends object, TReturn = unknown>(
  Component: ComponentType<TProps & CreateOverlayProps<TReturn>>,
  options?: OverlayOptions<TProps, TReturn>,
): CreateOverlayReturn<TProps, TReturn> {
  type Props = TProps & CreateOverlayProps<TReturn>
  interface Entry {
    key: number
    props: Props
    userProps: Props
    presented: boolean
    exited: Promise<void>
    resolveResult: (value: TReturn | undefined) => void
    resolveExit: () => void
  }

  const entries = new Map<string, Entry>()
  const subscribers = new Set<() => void>()
  let snapshot: Entry[] = []
  let propsSnapshot: Props[] = []
  let nextKey = 0
  const serverSnapshot: Entry[] = []
  const getStoreSnapshot = () => snapshot
  const getServerSnapshot = () => serverSnapshot
  const subscribe = (callback: () => void) => {
    subscribers.add(callback)
    return () => {
      subscribers.delete(callback)
    }
  }
  const publish = () => {
    snapshot = Array.from(entries.values())
    propsSnapshot = snapshot.map((entry) => entry.props)
    for (const callback of subscribers) callback()
  }
  const remove = (id: string) => {
    const entry = entries.get(id)
    if (!entry) return
    entries.delete(id)
    entry.resolveResult(undefined)
    entry.resolveExit()
    publish()
  }
  const getEntry = (id: string) => {
    const entry = entries.get(id)
    if (!entry) throw new Error(`[@newsnow/ui] Overlay with id "${id}" not found`)
    return entry
  }
  const close = (id: string, value?: TReturn) => {
    const entry = entries.get(id)
    if (!entry) return Promise.resolve()
    if (!entry.props.open) return entry.exited
    entry.props = { ...entry.props, open: false }
    entry.resolveResult(value)
    // An overlay closed before its first open render has no exit animation to await.
    if (!entry.presented) remove(id)
    else publish()
    return entry.exited
  }
  const open = (id: string, props: TProps) => {
    remove(id)
    let resolveResult!: Entry['resolveResult']
    let resolveExit!: Entry['resolveExit']
    const result = new Promise<TReturn | undefined>((resolve) => {
      resolveResult = resolve
    })
    const exited = new Promise<void>((resolve) => {
      resolveExit = resolve
    })
    const userProps = { ...options?.props, ...props } as Props
    const entry: Entry = {
      key: nextKey++,
      userProps,
      props: {
        ...userProps,
        open: true,
        onOpenChange: (details) => {
          if (entries.get(id) !== entry) return
          try {
            entry.userProps.onOpenChange?.(details)
          } finally {
            if (!details.open && entries.get(id) === entry) void close(id)
          }
        },
        onExitComplete: () => {
          if (entries.get(id) !== entry || entry.props.open) return
          try {
            entry.userProps.onExitComplete?.()
          } finally {
            if (entries.get(id) === entry) remove(id)
          }
        },
        setReturnValue: resolveResult,
        setExitComplete: resolveExit,
      },
      presented: false,
      exited,
      resolveResult,
      resolveExit,
    }
    entries.set(id, entry)
    publish()
    return result
  }
  const update = (id: string, props: Partial<TProps> & CreateOverlayProps<TReturn>) => {
    const entry = getEntry(id)
    entry.userProps = { ...entry.userProps, ...props }
    entry.props = {
      ...entry.props,
      ...props,
      open: entry.props.open,
      onOpenChange: entry.props.onOpenChange,
      onExitComplete: entry.props.onExitComplete,
      setReturnValue: entry.props.setReturnValue,
      setExitComplete: entry.props.setExitComplete,
    }
    publish()
  }
  const removeAll = () => {
    for (const entry of entries.values()) {
      entry.resolveResult(undefined)
      entry.resolveExit()
    }
    entries.clear()
    publish()
  }

  function ViewportItem({ entry, props }: { entry: Entry; props: Props }) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
      setMounted(true)
    }, [])
    useEffect(() => {
      if (mounted && props.open) entry.presented = true
    }, [entry, mounted, props.open])
    return <Component {...props} open={mounted && !!props.open} />
  }

  function Viewport() {
    const current = useSyncExternalStore(subscribe, getStoreSnapshot, getServerSnapshot)
    return (
      <>
        {current.map((entry) => (
          <ViewportItem key={entry.key} entry={entry} props={entry.props} />
        ))}
      </>
    )
  }

  return {
    Viewport,
    open,
    close,
    update,
    remove,
    removeAll,
    get: (id) => getEntry(id).props,
    has: (id) => entries.has(id),
    getSnapshot: () => propsSnapshot,
    waitForExit: (id) => entries.get(id)?.exited || Promise.resolve(),
  }
}
