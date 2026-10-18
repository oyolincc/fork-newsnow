import { Button, CloseButton, Spinner, Toast, Toaster, createToaster } from '@newsnow/ui'
import { useEffect, useState } from 'react'
import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Toast',
  component: Toast.Root,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { type: 'code' },
      description: { component: '通知类型、加载更新、操作回调、自定义内容和实例清理。' },
    },
  },
} satisfies Meta<typeof Toast.Root>
export default meta
type Story = StoryObj<typeof meta>
export const Lifecycle: Story = {
  render: function Lifecycle() {
    const [toaster] = useState(() =>
      createToaster({
        placement: 'bottom-end',
        pauseOnPageIdle: true,
        overlap: true,
        max: 3,
      }),
    )
    const [loadingId, setLoadingId] = useState<string>()
    const [actions, setActions] = useState(0)
    const [status, setStatus] = useState('尚未操作')
    const [customContent, setCustomContent] = useState(false)
    useEffect(() => () => toaster.remove(), [toaster])
    return (
      <div className={css({ display: 'grid', gap: '4', maxWidth: '4xl' })}>
        <p>通知在右下角显示；悬停时暂停关闭，离开后继续计时。离开此示例后清理通知。</p>
        <Toaster toaster={toaster} label="组件预览通知">
          {customContent
            ? (toast) => (
                <Toast.Root>
                  {toast.type === 'loading' ? <Spinner /> : <Toast.Indicator />}
                  <div>
                    <Toast.Title>{toast.title}</Toast.Title>
                    <Toast.Description>{toast.description}</Toast.Description>
                    {toast.action && (
                      <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
                    )}
                  </div>
                  {toast.closable && (
                    <Toast.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Toast.CloseTrigger>
                  )}
                </Toast.Root>
              )
            : undefined}
        </Toaster>
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3' })}>
          <Button variant="outline" onClick={() => setCustomContent((value) => !value)}>
            {customContent ? '切换默认通知内容' : '切换自定义通知内容'}
          </Button>
          {(['info', 'success', 'warning', 'error'] as const).map((type) => (
            <Button
              key={type}
              variant="outline"
              onClick={() =>
                toaster.create({
                  type,
                  title: `${type} 通知`,
                  description: '4 秒后自动关闭，也可点击关闭按钮。',
                  duration: 4000,
                  closable: true,
                  onStatusChange: (details) => setStatus(`${type}: ${details.status}`),
                })
              }>
              {type}
            </Button>
          ))}
          <Button
            onClick={() => {
              const id = toaster.create({
                type: 'loading',
                title: '等待操作完成',
                description: '点击“更新为成功”更新同一条通知。',
                closable: true,
              })
              setLoadingId(id)
            }}>
            创建 loading
          </Button>
          <Button
            variant="outline"
            disabled={!loadingId}
            onClick={() => {
              if (!loadingId) return
              toaster.update(loadingId, {
                type: 'success',
                title: '操作完成',
                description: '这条通知由 loading 更新而来。',
                duration: 4000,
              })
              setLoadingId(undefined)
            }}>
            更新为成功
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toaster.create({
                type: 'info',
                title: '带操作的通知',
                description: '操作按钮应执行一次并关闭通知。',
                duration: Infinity,
                closable: true,
                action: { label: '执行操作', onClick: () => setActions((count) => count + 1) },
              })
            }>
            带操作的通知
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              for (let index = 1; index <= 5; index++) {
                toaster.create({ title: `批量通知 ${index}`, duration: Infinity, closable: true })
              }
            }}>
            连续创建 5 条
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toaster.dismiss()
              setLoadingId(undefined)
            }}>
            关闭全部
          </Button>
        </div>
        <p role="status">
          操作执行 {actions} 次；生命周期：{status}
        </p>
      </div>
    )
  },
}
