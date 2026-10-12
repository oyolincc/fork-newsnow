import { defineSemanticTokens } from '@pandacss/dev'
import { green } from './green'
import { lime } from './lime'
import { red } from './red'
import { neutral } from './gray'
import { amber } from './amber'

export const colors = defineSemanticTokens.colors({
  green,
  lime,
  red,
  amber,
  gray: neutral,
})
