/* 来自 @pandacss/preset-panda */
import { defineTokens } from '@pandacss/dev'

export const fontSizes = defineTokens.fontSizes({
  '2xs': { value: '0.5rem' },
  xs: { value: '0.75rem' },
  sm: { value: '0.875rem' },
  md: { value: '1rem' },
  lg: { value: '1.125rem' },
  xl: { value: '1.25rem' },
  '2xl': { value: '1.5rem' },
  '3xl': { value: '1.875rem' },
  '4xl': { value: '2.25rem' },
  '5xl': { value: '3rem' },
  '6xl': { value: '3.75rem' },
  '7xl': { value: '4.5rem' },
  '8xl': { value: '6rem' },
  '9xl': { value: '8rem' },
})

export const fontWeights = defineTokens.fontWeights({
  thin: { value: '100' },
  extralight: { value: '200' },
  light: { value: '300' },
  normal: { value: '400' },
  medium: { value: '500' },
  semibold: { value: '600' },
  bold: { value: '700' },
  extrabold: { value: '800' },
  black: { value: '900' },
})

export const letterSpacings = defineTokens.letterSpacings({
  tighter: { value: '-0.05em' },
  tight: { value: '-0.025em' },
  normal: { value: '0em' },
  wide: { value: '0.025em' },
  wider: { value: '0.05em' },
  widest: { value: '0.1em' },
})

export const lineHeights = defineTokens.lineHeights({
  none: { value: '1' },
  xs: { value: 'calc(1 / 0.75)' },
  sm: { value: 'calc(1.25 / 0.875)' },
  md: { value: 'calc(1.5 / 1)' },
  lg: { value: 'calc(1.75 / 1.125)' },
  xl: { value: 'calc(1.75 / 1.25)' },
  '2xl': { value: 'calc(2 / 1.5)' },
  '3xl': { value: 'calc(2.25 / 1.875)' },
  '4xl': { value: 'calc(2.5 / 2.25)' },
  '5xl': { value: '{lineHeights.none}' },
  '6xl': { value: '{lineHeights.none}' },
  '7xl': { value: '{lineHeights.none}' },
  '8xl': { value: '{lineHeights.none}' },
  '9xl': { value: '{lineHeights.none}' },
})

export const fonts = defineTokens.fonts({
  sans: {
    value: [
      'ui-sans-serif',
      'system-ui',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ],
  },
  serif: {
    value: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
  },
  mono: {
    value: [
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      '"Liberation Mono"',
      '"Courier New"',
      'monospace',
    ],
  },
})
