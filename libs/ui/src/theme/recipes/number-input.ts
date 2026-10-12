import { numberInputAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe, defineStyles } from '@pandacss/dev'
import { input } from './input'

const trigger = defineStyles({
  alignItems: 'center',
  display: 'flex',
  flex: '1',
  justifyContent: 'center',
  userSelect: 'none',
})

const sizeStyles = {
  incrementTrigger: { lineHeight: '1', _icon: { boxSize: '1em' } },
  decrementTrigger: { lineHeight: '1', _icon: { boxSize: '1em' } },
  control: { width: 'var(--stepper-width)' },
  input: { pe: 'calc(var(--stepper-width) + 0.5rem)' },
} as const

const appearance = {
  incrementTrigger: {
    color: 'gray.fg.muted',
    cursor: 'pointer',
    transition: 'common',
    _hover: { bg: 'gray.bg.surface.hover' },
    _active: { bg: 'gray.bg.surface.active' },
    borderTopRightRadius: 'sm',
  },
  decrementTrigger: {
    color: 'gray.fg.muted',
    cursor: 'pointer',
    transition: 'common',
    _hover: { bg: 'gray.bg.surface.hover' },
    _active: { bg: 'gray.bg.surface.active' },
    borderBottomRightRadius: 'sm',
  },
  root: { _disabled: { layerStyle: 'disabled' } },
  control: { borderStartWidth: '1px', divideY: '1px', height: 'calc(100% - 2px)', margin: '1px' },
  label: { color: 'gray.fg.default', fontWeight: 'medium' },
} as const

export const numberInput = defineSlotRecipe({
  className: 'number-input',
  jsx: ['NumberInput.Root', 'NumberInput.RootProvider'],
  slots: numberInputAnatomy.keys(),
  base: {
    root: { isolation: 'isolate', position: 'relative' },
    control: {
      display: 'flex',
      flexDirection: 'column',
      insetEnd: '0px',
      position: 'absolute',
      top: '0',
      zIndex: '1',
    },
    input: { ...input.base, verticalAlign: 'top' },
    incrementTrigger: trigger,
    decrementTrigger: trigger,
  },
  defaultVariants: { size: 'md', variant: 'outline' },
  variants: {
    size: {
      sm: {
        ...sizeStyles,
        root: { '--stepper-width': 'sizes.4.5' },
        input: { ...sizeStyles.input, ...input.variants.size.sm },
      },
      md: {
        ...sizeStyles,
        root: { '--stepper-width': 'sizes.5' },
        input: { ...sizeStyles.input, ...input.variants.size.md },
      },
      lg: {
        ...sizeStyles,
        root: { '--stepper-width': 'sizes.5.5' },
        input: { ...sizeStyles.input, ...input.variants.size.lg },
      },
      xl: {
        ...sizeStyles,
        root: { '--stepper-width': 'sizes.6' },
        input: { ...sizeStyles.input, ...input.variants.size.xl },
      },
      unstyled: {},
    },
    variant: {
      outline: { ...appearance, input: input.variants.variant.outline },
      surface: { ...appearance, input: input.variants.variant.surface },
      unstyled: {},
    },
  },
})
