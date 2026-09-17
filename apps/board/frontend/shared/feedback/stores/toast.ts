import { atom } from 'jotai'

export type ToastItem = {
  id: number
  message: string
  type: 'error' | 'info' | 'success' | 'warning'
  duration?: number
  action?: { label: string; run: () => void }
  onDismiss?: () => void
}

export const toastsAtom = atom<ToastItem[]>([])
