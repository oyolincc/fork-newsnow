import type { ReactNode } from 'react'
import { css } from 'styled-system/css'

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className={css({ mx: 'auto', maxW: '2xl', p: { base: '4', md: '8' } })}>{children}</main>
  )
}
