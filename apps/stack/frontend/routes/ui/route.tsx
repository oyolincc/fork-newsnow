import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { css } from 'styled-system/css'

const pages = [
  { to: '/ui', label: '基础与便捷 API' },
  { to: '/ui/layout', label: '布局' },
  { to: '/ui/forms', label: '表单' },
  { to: '/ui/collections', label: '集合' },
  { to: '/ui/tree', label: '树形选择' },
  { to: '/ui/color', label: '颜色选择' },
  { to: '/ui/date', label: '日期与日历' },
  { to: '/ui/overlays', label: '浮层' },
  { to: '/ui/overlay-manager', label: '浮层管理' },
  { to: '/ui/data', label: '表格与标签' },
  { to: '/ui/timeline', label: '时间线' },
  { to: '/ui/display', label: '展示与反馈' },
  { to: '/ui/disclosure', label: '折叠与导航' },
  { to: '/ui/api', label: '类型与 store API' },
] as const

export const Route = createFileRoute('/ui')({ component: UiLayout })

function UiLayout() {
  return (
    <div className={css({ bg: 'bg.page', color: 'fg.default', minHeight: '100vh' })}>
      <header className={css({ px: '6', py: '4', borderBottomWidth: '1px' })}>
        <h1 className={css({ textStyle: '2xl', fontWeight: 'semibold', mb: '3' })}>UI 组件验收</h1>
        <nav
          aria-label="UI 验收分类"
          className={css({ display: 'flex', flexWrap: 'wrap', gap: '2' })}>
          {pages.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: true }}
              className={css({
                px: '3',
                py: '2',
                borderRadius: 'sm',
                textStyle: 'sm',
                _hover: { bg: 'gray.subtle.bg' },
                _focusVisible: {
                  outline: '2px solid',
                  outlineColor: 'colorPalette.solid.bg',
                  outlineOffset: '2px',
                },
              })}
              activeProps={{
                className: css({
                  bg: 'gray.surface.bg',
                  fontWeight: 'semibold',
                  textDecoration: 'underline',
                }),
              }}>
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
