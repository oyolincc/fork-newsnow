import { createFileRoute } from '@tanstack/react-router'
import { NewsBoard } from '#/modules/board/components/NewsBoard'
import { useAtomValue } from 'jotai'
import { focusSourceIdsAtom } from '#/modules/board/stores'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const focusSourceIds = useAtomValue(focusSourceIdsAtom)
  return <NewsBoard columnId={focusSourceIds.length ? 'focus' : 'hottest'} />
}
