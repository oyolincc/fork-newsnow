import { defineSlotRecipe } from '@pandacss/dev'

const sizeStyles = { link: { gap: '2' } } as const

const appearance = {
  currentLink: { color: 'gray.fg.default' },
  link: {
    borderRadius: 'xs',
    focusRing: 'outside',
    outline: '0',
    textDecoration: 'none',
    transition: 'color',
  },
  item: { color: 'gray.fg.muted', _last: { color: 'gray.fg.default' } },
  separator: { color: 'gray.fg.subtle' },
  ellipsis: { color: 'gray.fg.muted' },
} as const

export const breadcrumb = defineSlotRecipe({
  className: 'app-breadcrumb',
  jsx: ['Breadcrumb.Root'],
  slots: ['root', 'list', 'link', 'item', 'separator', 'ellipsis', 'currentLink'],
  base: {
    currentLink: { display: 'inline-flex', alignItems: 'center', _icon: { boxSize: '1em' } },
    list: { alignItems: 'center', display: 'flex', listStyle: 'none', wordBreak: 'break-word' },
    link: { alignItems: 'center', display: 'inline-flex', _icon: { boxSize: '1em' } },
    item: { display: 'inline-flex', alignItems: 'center' },
    separator: { _icon: { boxSize: '1em' }, _rtl: { rotate: '180deg' } },
    ellipsis: {
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'center',
      _icon: { boxSize: '1em' },
    },
  },
  variants: {
    variant: {
      underline: {
        ...appearance,
        link: {
          ...appearance.link,
          textDecoration: 'underline',
          textDecorationThickness: '0.1em',
          textUnderlineOffset: '0.125em',
          textDecorationColor: 'gray.fg.subtle',
          _hover: { textDecorationColor: 'gray.fg.default' },
        },
      },
      plain: {
        ...appearance,
        link: {
          ...appearance.link,
          color: 'gray.fg.muted',
          _hover: { color: 'gray.fg.default' },
          _currentPage: { color: 'gray.fg.default' },
        },
      },
      unstyled: {},
    },
    size: {
      xs: { ...sizeStyles, list: { gap: '1', textStyle: 'xs' } },
      sm: { ...sizeStyles, list: { gap: '1', textStyle: 'sm' } },
      md: { ...sizeStyles, list: { gap: '1.5', textStyle: 'md' } },
      lg: { ...sizeStyles, list: { gap: '2', textStyle: 'lg' } },
      unstyled: {},
    },
  },
  defaultVariants: { variant: 'plain', size: 'md' },
})
