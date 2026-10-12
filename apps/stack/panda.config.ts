import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  designSystem: '@newsnow/ui',
  importMap: ['styled-system', { jsx: '@newsnow/ui' }],
  // Stack 使用 UI 设计系统；应用侧负责 reset 与文档全局样式。
  // Panda preflight 替代原有 reset，组件状态样式由 UI 配方提供。
  preflight: true,
  prefix: {
    className: '',
  },
  globalCss: {
    extend: {
      'html, body': { minHeight: 'full', margin: '0' },
      'html.dark': { colorScheme: 'dark' },
      body: { fontFamily: 'sans' },
    },
  },
  jsxFramework: 'react',
  include: ['./frontend/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
})
