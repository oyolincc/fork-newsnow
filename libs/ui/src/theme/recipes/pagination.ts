import { paginationAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const pagination = defineSlotRecipe({
  className: 'app-pagination',
  jsx: ['Pagination.Root', 'Pagination.RootProvider'],
  slots: paginationAnatomy.keys(),
  base: {},
})
