import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  designSystem: '@newsnow/ui',
  // designSystem 自动注册样式入口；不要把 UI 组件入口映射为 Panda JSX，
  // 否则启用源码转换时会将 Stack 等带行为的组件内联成原生元素。
  // Stack 使用 UI 设计系统；应用侧负责 reset 与文档全局样式。
  // Panda preflight 替代原有 reset，组件状态样式由 UI 配方提供。
  preflight: true,
  prefix: {
    className: '',
  },
  globalCss: {
    extend: {
      'html, body': { minHeight: 'full', margin: '0' },
      html: {
        colorPalette: 'gray',
      },
      'html.dark': { colorScheme: 'dark' },
      body: {
        fontFamily: 'sans',
        background: 'gray.bg.page',
        color: 'gray.fg.default',
      },
    },
  },
  jsxFramework: 'react',
  include: ['./frontend/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
})
