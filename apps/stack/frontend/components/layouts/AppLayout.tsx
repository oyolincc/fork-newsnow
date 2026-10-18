import type { ReactNode } from 'react'
import { css } from 'styled-system/css'
import { Header } from './Header'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className={css({ minHeight: 'screen', bg: 'gray.bg.page', color: 'gray.fg.default' })}>
      <Header />
      {children}
    </div>
  )
}
