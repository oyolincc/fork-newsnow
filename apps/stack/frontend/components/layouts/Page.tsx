import type { ReactNode } from 'react'
import { vstack } from 'styled-system/patterns'

export function Page({ children }: { children: ReactNode }) {
  return <section className={vstack({ gap: '6', alignItems: 'stretch' })}>{children}</section>
}
