import type { ReactNode } from 'react'

export function PageContainer({ children }: { children: ReactNode }) {
  return <main className="mx-auto max-w-2xl p-8">{children}</main>
}
