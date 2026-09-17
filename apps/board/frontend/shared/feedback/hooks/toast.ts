import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { toastsAtom, type ToastItem } from '../stores/toast'

let nextToastId = 0

export function useToast() {
  const setToasts = useSetAtom(toastsAtom)
  return useCallback(
    (message: string, options: Partial<Omit<ToastItem, 'id' | 'message'>> = {}) =>
      setToasts((items) => [
        { id: ++nextToastId, message, ...options, type: options.type || 'info' },
        ...items,
      ]),
    [setToasts],
  )
}
