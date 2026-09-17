import { createFileRoute, redirect } from '@tanstack/react-router'
import { NewsBoard } from '#/modules/board/components/NewsBoard'
import { isColumnId } from '#/modules/board/models/columns'

export const Route = createFileRoute('/c/$column')({
  component: ColumnRoute,
  params: {
    // `/c/HOTTEST` 也按 hottest 处理；如果不是三个已知栏目，下面的 onError 会把用户送回首页。
    parse: ({ column }) => {
      const normalized = column.toLowerCase()
      if (!isColumnId(normalized)) throw new Error(`Unknown column: ${column}`)
      return { column: normalized }
    },
    stringify: ({ column }) => ({ column }),
  },
  onError: (error) => {
    if (error.routerCode === 'PARSE_PARAMS') throw redirect({ to: '/' })
  },
})

function ColumnRoute() {
  // return <NewsBoard columnId={Route.useParams().column} />
  return <div>Hello World Column</div>
}
