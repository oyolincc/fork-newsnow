import type { ReactNode } from 'react'
import { Header } from './Header'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      {children}
    </div>
  )
}
