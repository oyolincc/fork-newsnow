import { useContext } from 'react'
import { SessionContext } from '../stores/session'

export function useSession() {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useSession must be used within SessionProvider')
  return session
}
