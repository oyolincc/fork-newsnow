import { defineSlotRecipe } from '@pandacss/dev'
import { input } from './input'

const appearance = {
  field: {
    bg: 'gray.bg.page',
    color: 'gray.fg.default',
    _light: { colorScheme: 'light' },
    _dark: { colorScheme: 'dark' },
    '& option, & optgroup': { bg: 'gray.bg.page', color: 'gray.fg.default' },
    cursor: 'pointer',
    _disabled: { layerStyle: 'disabled', cursor: 'not-allowed' },
  },
  indicator: {
    color: 'gray.fg.muted',
    _disabled: { opacity: '0.5' },
    _invalid: { color: 'red.9' },
  },
} as const

export const nativeSelect = defineSlotRecipe({
  className: 'native-select',
  jsx: ['NativeSelect.Root'],
  slots: ['root', 'field', 'indicator'],
  base: {
    root: { position: 'relative', width: 'full', display: 'inline-flex' },
    field: input.base,
    indicator: {
      position: 'absolute',
      insetInlineEnd: '0',
      top: '0',
      bottom: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    },
  },
  variants: {
    variant: {
      ...(Object.fromEntries(
        Object.entries(input.variants.variant)
          .filter(([name]) => name !== 'unstyled')
          .map(([name, styles]) => [
            name,
            {
              field: { ...appearance.field, ...styles, _disabled: appearance.field._disabled },
              indicator: appearance.indicator,
            },
          ]),
      ) as {
        [K in Exclude<keyof typeof input.variants.variant, 'unstyled'>]: {
          field: typeof appearance.field & (typeof input.variants.variant)[K]
          indicator: typeof appearance.indicator
        }
      }),
      unstyled: {},
    },
    size: {
      ...(Object.fromEntries(
        Object.entries(input.variants.size).flatMap(([name, styles]) =>
          'textStyle' in styles
            ? [
                [
                  name,
                  {
                    root: {
                      textStyle: styles.textStyle,
                      '--input-height': styles['--input-height'],
                    },
                    field: { ...styles, paddingInlineEnd: 'var(--input-height)' },
                    indicator: { width: 'var(--input-height)', _icon: { boxSize: '1em' } },
                  },
                ],
              ]
            : [],
        ),
      ) as {
        [K in Exclude<keyof typeof input.variants.size, 'unstyled'>]: {
          root: {
            textStyle: (typeof input.variants.size)[K]['textStyle']
            '--input-height': string
          }
          field: (typeof input.variants.size)[K] & { paddingInlineEnd: string }
          indicator: { width: string; _icon: { boxSize: string } }
        }
      }),
      unstyled: {},
    },
  },
  defaultVariants: { size: 'md', variant: 'outline' },
})
