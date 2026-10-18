import { Button, Pagination } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '分页、首尾跳转和外部状态控制。' },
    },
  },
} satisfies Meta<typeof Pagination.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Controlled: Story = {
  render: function Controlled() {
    const [page, setPage] = useState(1)
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
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
      </div>
    )
  },
}
