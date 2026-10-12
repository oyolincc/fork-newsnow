import { tagsInputAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = {
  root: { gap: '1.5' },
  label: { textStyle: 'label' },
  control: {
    '--input-height': 'var(--tags-input-height)',
    minH: 'var(--tags-input-height)',
    px: 'var(--tags-input-px)',
  },
  clearTrigger: { boxSize: 'calc(var(--tags-input-item-height) / 1.5)', _icon: { boxSize: '5' } },
  input: {
    px: 'calc(var(--tags-input-item-px) / 1.25)',
    height: 'var(--tags-input-item-height)',
    minWidth: '20',
  },
  itemInput: {
    px: 'var(--tags-input-item-px)',
    height: 'var(--tags-input-item-height)',
    lineHeight: '1',
  },
  itemPreview: { height: 'var(--tags-input-item-height)', px: 'var(--tags-input-item-px)' },
} as const

const appearance = {
  control: {
    '--focus-color': 'colors.colorPalette.ring',
    '--error-color': 'colors.red.9',
    borderRadius: 'sm',
    transitionDuration: 'normal',
    transitionProperty: 'border-color, box-shadow',
    _disabled: { opacity: '0.5' },
  },
  clearTrigger: {
    borderRadius: 'xs',
    color: 'gray.fg.muted',
    focusRingWidth: '2px',
    focusVisibleRing: 'inside',
    cursor: { base: 'pointer', _disabled: 'initial' },
  },
  input: { outline: 'none' },
  itemInput: { outline: 'none' },
  itemDeleteTrigger: {
    borderRadius: 'xs',
    cursor: 'pointer',
    _hover: { bg: 'colorPalette.bg.subtle' },
  },
  itemPreview: { borderRadius: 'xs' },
} as const

export const tagsInput = defineSlotRecipe({
  className: 'tags-input',
  jsx: ['TagsInput.Root', 'TagsInput.RootProvider'],
  slots: tagsInputAnatomy.keys(),
  base: {
    root: { display: 'flex', flexDirection: 'column', width: 'full' },
    control: { alignItems: 'center', display: 'flex', flexWrap: 'wrap', pos: 'relative' },
    clearTrigger: { alignItems: 'center', display: 'flex', justifyContent: 'center' },
    input: { flex: '1', _readOnly: { display: 'none' } },
    itemInput: { minWidth: '2ch', verticalAlign: 'middle' },
    itemDeleteTrigger: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    itemPreview: { alignItems: 'center', display: 'inline-flex', userSelect: 'none' },
    itemText: { lineClamp: '1' },
  },
  defaultVariants: { size: 'md', variant: 'outline' },
  variants: {
    variant: {
      outline: {
        ...appearance,
        control: {
          ...appearance.control,
          borderWidth: '1px',
          _invalid: { borderColor: 'var(--error-color)' },
          _focus: {
            outlineWidth: '1px',
            outlineStyle: 'solid',
            outlineColor: 'var(--focus-color)',
            borderColor: 'var(--focus-color)',
            _invalid: { outlineColor: 'var(--error-color)', borderColor: 'var(--error-color)' },
          },
        },
        itemPreview: {
          ...appearance.itemPreview,
          bg: 'colorPalette.bg.subtle',
          color: 'colorPalette.fg.default',
          _highlighted: { bg: 'colorPalette.bg.subtle.hover' },
        },
      },
      subtle: {
        ...appearance,
        control: {
          ...appearance.control,
          bg: 'gray.bg.subtle',
          color: 'gray.fg.default',
          borderWidth: '1px',
          borderColor: 'transparent',
          _focus: {
            outlineWidth: '1px',
            outlineStyle: 'solid',
            outlineColor: 'var(--focus-color)',
            borderColor: 'var(--focus-color)',
            _invalid: { outlineColor: 'var(--error-color)', borderColor: 'var(--error-color)' },
          },
        },
        itemPreview: {
          ...appearance.itemPreview,
          bg: 'gray.bg.surface',
          borderWidth: '1px',
          _highlighted: { bg: 'gray.bg.surface.hover', borderColor: 'gray.border.default.hover' },
        },
      },
      surface: {
        ...appearance,
        control: {
          ...appearance.control,
          bg: 'gray.bg.surface',
          borderWidth: '1px',
          borderColor: 'gray.border.default',
          _focus: {
            outlineWidth: '1px',
            outlineStyle: 'solid',
            outlineColor: 'var(--focus-color)',
            borderColor: 'var(--focus-color)',
            _invalid: { outlineColor: 'var(--error-color)', borderColor: 'var(--error-color)' },
          },
        },
        itemPreview: {
          ...appearance.itemPreview,
          bg: 'colorPalette.bg.subtle',
          color: 'colorPalette.fg.default',
          _highlighted: { bg: 'colorPalette.bg.subtle.hover' },
        },
      },
      unstyled: {},
    },
    size: {
      xs: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--tags-input-height': 'sizes.8',
          '--tags-input-px': 'spacing.1.5',
          '--tags-input-item-height': 'sizes.5',
          '--tags-input-item-px': 'spacing.1',
          _icon: { boxSize: '3' },
          textStyle: 'xs',
        },
        control: { ...sizeStyles.control, gap: '1' },
        itemPreview: { ...sizeStyles.itemPreview, gap: '1' },
        itemDeleteTrigger: { boxSize: '3.5', me: '-1px' },
      },
      sm: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--tags-input-height': 'sizes.9',
          '--tags-input-px': 'spacing.1.5',
          '--tags-input-item-height': 'sizes.6',
          '--tags-input-item-px': 'spacing.1.5',
          _icon: { boxSize: '3.5' },
          textStyle: 'sm',
        },
        control: { ...sizeStyles.control, gap: '1' },
        itemPreview: { ...sizeStyles.itemPreview, gap: '1' },
        itemDeleteTrigger: { boxSize: '4.5', me: '-0.5' },
      },
      md: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--tags-input-height': 'sizes.10',
          '--tags-input-px': 'spacing.1.5',
          '--tags-input-item-height': 'sizes.7',
          '--tags-input-item-px': 'spacing.2',
          _icon: { boxSize: '3.5' },
          textStyle: 'sm',
        },
        control: { ...sizeStyles.control, gap: '1.5' },
        itemPreview: { ...sizeStyles.itemPreview, gap: '1' },
        itemDeleteTrigger: { boxSize: '5', me: '-1' },
      },
      lg: {
        ...sizeStyles,
        root: {
          ...sizeStyles.root,
          '--tags-input-height': 'sizes.11',
          '--tags-input-px': 'spacing.1.5',
          '--tags-input-item-height': 'sizes.8',
          '--tags-input-item-px': 'spacing.2.5',
          _icon: { boxSize: '4' },
          textStyle: 'md',
        },
        control: { ...sizeStyles.control, gap: '1.5' },
        itemPreview: { ...sizeStyles.itemPreview, gap: '1' },
        itemDeleteTrigger: { boxSize: '6', me: '-1.5' },
      },
      unstyled: {},
    },
  },
})
