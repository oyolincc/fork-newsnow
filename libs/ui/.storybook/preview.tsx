import type { Preview } from '@storybook/react-vite'
import { lazy, Suspense, useEffect, useState, type PropsWithChildren } from 'react'
import type { DocsContainerProps } from '@storybook/addon-docs/blocks'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import type { Globals } from 'storybook/internal/types'
import { themes } from 'storybook/theming'
import { MINIMAL_VIEWPORTS } from 'storybook/viewport'
import './styles.css'

const DocsContainer = lazy(() =>
  import('@storybook/addon-docs/blocks').then((module) => ({ default: module.DocsContainer })),
)

function ThemedDocsContainer({ children, context }: PropsWithChildren<DocsContainerProps>) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    context.getStoryContext(context.componentStories()[0]).globals.theme === 'light' ? 'light' : 'dark',
  )

  useEffect(() => {
    const updateTheme = ({ globals }: { globals: Globals }) => {
      setTheme(globals.theme === 'light' ? 'light' : 'dark')
    }
    context.channel.on(GLOBALS_UPDATED, updateTheme)
    return () => context.channel.off(GLOBALS_UPDATED, updateTheme)
  }, [context.channel])

  return (
    <Suspense fallback={null}>
      <DocsContainer context={context} theme={themes[theme]}>
        {children}
      </DocsContainer>
    </Suspense>
  )
}

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: '组件主题',
      toolbar: {
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'light', title: '浅色' },
          { value: 'dark', title: '深色' },
        ],
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    backgrounds: { disable: true },
    viewport: { options: MINIMAL_VIEWPORTS },
    docs: {
      container: ThemedDocsContainer,
      codePanel: true,
      source: { type: 'dynamic', excludeDecorators: true },
    },
  },
  decorators: [
    function ThemeDecorator(Story, { globals }) {
      const theme = globals.theme === 'light' ? 'light' : 'dark'

      useEffect(() => {
        const root = document.documentElement
        root.classList.toggle('dark', theme === 'dark')
        root.classList.toggle('light', theme === 'light')
        root.style.colorScheme = theme
      }, [theme])

      return <Story />
    },
  ],
}

export default preview
