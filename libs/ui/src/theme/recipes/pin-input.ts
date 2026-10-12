import { pinInputAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'
import { input } from './input'

const sizeStyles = { input: { width: 'var(--input-height)' }, control: { gap: '2' } } as const

export const pinInput = defineSlotRecipe({
  className: 'pin-input',
  jsx: ['PinInput.Root', 'PinInput.RootProvider'],
  slots: pinInputAnatomy.keys(),
  base: {
    input: { ...input.base, textAlign: 'center', px: '1!' },
    control: { display: 'inline-flex', isolation: 'isolate' },
  },
  defaultVariants: { size: 'md', variant: 'outline' },
  variants: {
    size: {
      xs: { ...sizeStyles, input: { ...sizeStyles.input, ...input.variants?.size?.xs } },
      sm: { ...sizeStyles, input: { ...sizeStyles.input, ...input.variants?.size?.sm } },
      md: { ...sizeStyles, input: { ...sizeStyles.input, ...input.variants?.size?.md } },
      lg: { ...sizeStyles, input: { ...sizeStyles.input, ...input.variants?.size?.lg } },
      xl: { ...sizeStyles, input: { ...sizeStyles.input, ...input.variants?.size?.xl } },
      '2xl': { ...sizeStyles, input: { ...sizeStyles.input, ...input.variants?.size?.['2xl'] } },
      unstyled: {},
    },
    variant: {
      outline: { input: input.variants?.variant?.outline },
      subtle: { input: input.variants?.variant?.subtle },
      flushed: { input: input.variants?.variant?.flushed },
      unstyled: {},
    },
  },
})
