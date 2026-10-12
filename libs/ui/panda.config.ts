import { animationStyles } from '@/theme/animation-styles'
import { breakpoints } from '@/theme/breakpoints'
import { textStyles } from '@/theme/text-styles'
import { layerStyles } from '@/theme/layer-styles'
import { keyframes } from '@/theme/keyframes'
import { globalCss } from '@/theme/global-css'
import { conditions } from '@/theme/conditions'
import { slotRecipes, recipes } from '@/theme/recipes'
import { defineConfig } from '@pandacss/dev'
import { patterns } from './src/theme/patterns'
import { containers } from './src/theme/containers'
import { tokens } from '@/theme/tokens'
import { semanticTokens } from '@/theme/semanticTokens'

export default defineConfig({
  presets: ['@pandacss/preset-base'],
  jsxFramework: 'react',
  separator: '-',
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  // strictTokens: true,
  // strictPropertyValues: true,

  theme: {
    tokens,
    semanticTokens,
    animationStyles,
    breakpoints,
    recipes,
    slotRecipes,
    keyframes,
    layerStyles,
    textStyles,
    containers,
  },

  patterns: { extend: patterns },
  outdir: 'styled-system',
  globalCss,
  conditions,
})
