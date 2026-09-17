import { Link } from '@tanstack/react-router'
import { useAtomValue, useSetAtom } from 'jotai'
import { ColumnIds, ColumnNames } from '../models/columns'
import { currentColumnAtom, searchOpenedAtom } from '../stores'

export function NavBar() {
  const current = useAtomValue(currentColumnAtom)
  const setSearchOpened = useSetAtom(searchOpenedAtom)

  // 页面同时有桌面和手机版导航，它们读取同一个 currentColumnAtom，所以高亮栏目不会各自跑偏。
  return (
    <nav className="flex rounded-2xl bg-primary/10 p-3 text-sm shadow shadow-primary/20 transition-shadow duration-500 hover:shadow-primary/50">
      <button
        type="button"
        onClick={() => setSearchOpened((opened) => !opened)}
        className="cursor-pointer px-2 opacity-70 transition-all hover:rounded-md hover:bg-primary/10">
        更多
      </button>
      {ColumnIds.map((columnId) => (
        <Link
          key={columnId}
          to="/c/$column"
          params={{ column: columnId }}
          className={`cursor-pointer px-2 transition-all hover:rounded-md hover:bg-primary/10 ${current === columnId ? 'font-bold text-primary' : 'opacity-70'}`}>
          {ColumnNames[columnId]}
        </Link>
      ))}
    </nav>
  )
}
