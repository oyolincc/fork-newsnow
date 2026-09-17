import { sourceCatalog, type SourceID } from '@newsnow/definition/frontend'
import { StarIcon } from '@phosphor-icons/react'
import { Command } from 'cmdk'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { SourceCard } from '#/modules/sources/components/SourceCard'
import { SOURCE_SEARCH_DEFAULT_SOURCE } from '../constants'
import { useSourceFocus } from '../hooks/preferences'
import { CanonicalSourceIds, SourceColumnNames } from '../models/columns'
import { searchOpenedAtom } from '../stores'
import '../styles/source-search.css'

// 页面启动时把来源按“科技、财经”等栏目分组；科技放最前，未分类放最后，中间按中文名称排列。
const SourceGroups = (() => {
  const grouped = new Map<string, SourceID[]>()
  for (const sourceId of CanonicalSourceIds) {
    const column = SourceColumnNames[sourceCatalog[sourceId].column] || '未分类'
    grouped.set(column, [...(grouped.get(column) || []), sourceId])
  }
  return [...grouped].sort(([left], [right]) => {
    if (left === '科技') return -1
    if (right === '科技') return 1
    if (left === '未分类') return 1
    if (right === '未分类') return -1
    return left.localeCompare(right, 'zh-CN')
  })
})()

export function SourceSearchDialog() {
  const [opened, setOpened] = useAtom(searchOpenedAtom)
  const [selected, setSelected] = useState<SourceID>(SOURCE_SEARCH_DEFAULT_SOURCE)

  // 用户按 Command+K 或 Ctrl+K 时阻止浏览器默认动作，并打开或关闭这个搜索框。
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpened((value) => !value)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [setOpened])
  return (
    <Command.Dialog
      open={opened}
      onOpenChange={setOpened}
      value={selected}
      onValueChange={(value) => {
        if (CanonicalSourceIds.includes(value as SourceID)) setSelected(value as SourceID)
      }}>
      <Command.Input autoFocus placeholder="搜索你想要的" />
      <div className="pt-2 md:flex">
        <Command.List className="max-h-[500px] min-w-[275px] overflow-y-auto">
          <Command.Empty>没有找到，可以前往 GitHub 提 issue</Command.Empty>
          {SourceGroups.map(([column, sourceIds]) => (
            <Command.Group heading={column} key={column}>
              {sourceIds.map((sourceId) => (
                <SourceSearchItem sourceId={sourceId} key={sourceId} />
              ))}
            </Command.Group>
          ))}
        </Command.List>
        <div className="min-w-[350px] flex-1 px-4 pt-2 max-md:hidden">
          <SourceCard sourceId={selected} />
        </div>
      </div>
    </Command.Dialog>
  )
}

function SourceSearchItem({ sourceId }: { sourceId: SourceID }) {
  const source = sourceCatalog[sourceId]
  const focus = useSourceFocus(sourceId)
  return (
    // 点击这一行会关注或取消关注；键盘上下移动只改变 selected，用来更新右侧预览，不会误改关注。
    <Command.Item
      keywords={[
        source.name,
        'title' in source ? source.title || '' : '',
        __SOURCE_SEARCH_INDEX__[sourceId] || '',
      ]}
      value={sourceId}
      className="flex items-center justify-between p-2"
      onSelect={focus.toggle}>
      <span className="flex items-center gap-2">
        <span
          className="h-4 w-4 rounded-md bg-cover"
          style={{
            backgroundImage: `url(/icons/${sourceId.split('-')[0]}.png), url(/icons/default.png)`,
          }}
        />
        <span>{source.name}</span>
        {'title' in source && source.title && (
          <span className="mb-[3px] self-end text-xs text-neutral-400/80">{source.title}</span>
        )}
      </span>
      <StarIcon className="text-primary opacity-40" weight={focus.focused ? 'fill' : 'duotone'} />
    </Command.Item>
  )
}
