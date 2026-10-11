import type { ReactNode } from 'react'

export function Page({ children }: { children: ReactNode }) {
  return <section className="flex flex-col gap-6">{children}</section>
}
