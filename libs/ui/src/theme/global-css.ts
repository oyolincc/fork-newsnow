import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  extend: {
    '*': {
      '--global-color-border': 'colors.gray.border.subtle',
      '--global-color-placeholder': 'colors.gray.fg.subtle',
      '--global-color-selection': 'colors.colorPalette.bg.subtle',
      '--global-color-focus-ring': 'colors.colorPalette.ring',
    },
    html: {
      colorPalette: 'gray',
    },
    body: {
      background: 'gray.bg.page',
      color: 'gray.fg.default',
    },
  },
})
