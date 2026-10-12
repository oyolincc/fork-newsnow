import { defineTokens } from '@pandacss/dev'
import { fonts, fontSizes, fontWeights, letterSpacings, lineHeights } from './typography'
import { durations } from './durations'
import { zIndex } from './z-index'
import { borders } from './borders'
import { easings } from './easings'
import { radii } from './radii'
import { aspectRatios } from './aspect-ratio'
import { sizes } from './sizes'
import { spacing } from './spacing'
import { colors } from './colors'
import { animations } from './animations'

export const tokens = defineTokens({
  /* 样式相关 */
  aspectRatios,
  animations,
  durations,
  easings,
  colors,
  zIndex,
  borders,
  radii,
  blurs: {
    xs: { value: '4px' },
    sm: { value: '8px' },
    md: { value: '12px' },
    lg: { value: '16px' },
    xl: { value: '24px' },
    '2xl': { value: '40px' },
    '3xl': { value: '64px' },
  },
  /* 尺寸 */
  sizes,
  spacing,
  /* 排版相关 */
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
})
