import { fieldsetAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const fieldset = defineSlotRecipe({
  className: 'app-fieldset',
  jsx: ['Fieldset.Root', 'Fieldset.RootProvider'],
  slots: fieldsetAnatomy.extendWith('content', 'control').keys(),
  base: {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      width: 'full',
      flexDirection: { base: 'column', md: 'row' },
      gap: { base: '5', md: '8' },
    },
    control: {
      maxW: 'xs',
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
      gap: '1',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
      maxW: '2xl',
      gap: '4',
    },
    legend: {
      color: 'gray.fg.default',
      fontWeight: 'semibold',
    },
    helperText: {
      color: 'gray.fg.muted',
      textStyle: 'sm',
    },
    errorText: {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'red.9',
      gap: '2',
      fontWeight: 'medium',
      textStyle: 'sm',
    },
  },
})
