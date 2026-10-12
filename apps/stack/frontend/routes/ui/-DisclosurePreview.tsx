import { Accordion, Button, Collapsible, Pagination } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

export function DisclosurePreview() {
  const [expanded, setExpanded] = useState(['intro'])
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  return (
    <section
      aria-labelledby="disclosure-heading"
      className={css({ display: 'grid', gap: '5', padding: { base: '6', md: '10' } })}>
      <h2 id="disclosure-heading" className={css({ textStyle: '2xl', fontWeight: 'semibold' })}>
        Accordion、Collapsible、Pagination 验收
      </h2>
      <p>Accordion 支持多项展开；方向键移动焦点并跳过禁用项，Enter/空格切换展开状态。</p>
      <Accordion.Root
        multiple
        collapsible
        value={expanded}
        onValueChange={(details) => setExpanded(details.value)}
        maxWidth="xl">
        <Accordion.Item value="intro">
          <h3>
            <Accordion.ItemTrigger>
              组件说明
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
          </h3>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              默认 outline 配方，内容展开时应有高度动画，箭头随状态旋转。
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="disabled" disabled>
          <h3>
            <Accordion.ItemTrigger>
              禁用项目
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
          </h3>
          <Accordion.ItemContent>
            <Accordion.ItemBody>该项目不可展开。</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="details">
          <h3>
            <Accordion.ItemTrigger>
              更多详情
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
          </h3>
          <Accordion.ItemContent>
            <Accordion.ItemBody>此项可以与第一项同时展开，也可以单独收起。</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
      <div className={css({ display: 'flex', gap: '3', flexWrap: 'wrap' })}>
        <Button type="button" variant="outline" onClick={() => setExpanded(['intro', 'details'])}>
          外部展开全部可用项目
        </Button>
        <Button type="button" variant="outline" onClick={() => setExpanded([])}>
          外部收起全部
        </Button>
      </div>
      <p role="status">展开项目：{expanded.join('、') || '无'}</p>

      <Collapsible.Root
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        lazyMount
        unmountOnExit
        maxWidth="xl">
        <Collapsible.Trigger asChild>
          <Button type="button" variant="outline">
            {open ? '收起详情' : '展开详情'}
          </Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div
            className={css({
              padding: '4',
              borderWidth: '1px',
              borderRadius: 'md',
              marginTop: '3',
            })}>
            <p>首次展开才挂载，关闭动画结束后卸载。</p>
            <Button type="button" variant="plain" onClick={() => setOpen(false)}>
              从内容内部关闭
            </Button>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      <div className={css({ display: 'grid', gap: '3' })}>
        <h3 className={css({ textStyle: 'lg', fontWeight: 'semibold' })}>受控分页</h3>
        <Pagination.Root
          count={200}
          pageSize={10}
          page={page}
          onPageChange={(details) => setPage(details.page)}
          aria-label="示例数据分页"
          display="flex"
          gap="2"
          flexWrap="wrap">
          <Pagination.PrevTrigger asChild>
            <Button type="button" variant="outline">
              上一页
            </Button>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={({ value, selected }) => (
              <Button type="button" variant={selected ? 'solid' : 'outline'}>
                {value}
              </Button>
            )}
            ellipsis={
              <span className={css({ display: 'inline-flex', alignItems: 'center', px: '2' })}>
                …
              </span>
            }
          />
          <Pagination.NextTrigger asChild>
            <Button type="button" variant="outline">
              下一页
            </Button>
          </Pagination.NextTrigger>
        </Pagination.Root>
        <p role="status">
          第 {page} / 20 页；当前范围 {(page - 1) * 10 + 1}–{page * 10} / 200 条。
        </p>
        <div className={css({ display: 'flex', gap: '3', flexWrap: 'wrap' })}>
          <Button type="button" variant="outline" onClick={() => setPage(1)}>
            外部回到首页
          </Button>
          <Button type="button" variant="outline" onClick={() => setPage(20)}>
            外部跳到末页
          </Button>
        </div>
      </div>

      <p>自定外观保留默认尺寸与展开行为；系统开启减少动态效果时，内容直接展开／收起。</p>
      <Accordion.Root variant="unstyled" collapsible maxWidth="xl">
        <Accordion.Item value="custom" borderBottomWidth="1px" borderColor="lime.6">
          <h3>
            <Accordion.ItemTrigger color="lime.11" fontWeight="medium" focusVisibleRing="outside">
              自定外观
              <Accordion.ItemIndicator color="lime.10" />
            </Accordion.ItemTrigger>
          </h3>
          <Accordion.ItemContent>
            <Accordion.ItemBody color="gray.fg.muted">
              内容与指示器仍跟随展开状态。
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  )
}
