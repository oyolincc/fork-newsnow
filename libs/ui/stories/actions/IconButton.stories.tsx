import { CloseButton, IconButton } from '@newsnow/ui'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { SearchIcon } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '图标按钮与关闭按钮的点击反馈。' },
    },
  },
} satisfies Meta<typeof IconButton>
export default meta
type Story = StoryObj<typeof meta>
export const ClickAndClose: Story = {
  render: function ClickAndClose() {
    const [message, setMessage] = useState('点击图标按钮或关闭按钮查看状态。')
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <IconButton aria-label="搜索" variant="outline" onClick={() => setMessage('已点击搜索。')}>
          <SearchIcon />
        </IconButton>
        <CloseButton aria-label="关闭提示" onClick={() => setMessage('已点击关闭。')} />
        <p role="status">{message}</p>
      </div>
    )
  },
}
