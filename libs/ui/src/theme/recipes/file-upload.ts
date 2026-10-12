import { fileUploadAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const fileUpload = defineSlotRecipe({
  className: 'file-upload',
  jsx: ['FileUpload.Root', 'FileUpload.RootProvider'],
  slots: fileUploadAnatomy.keys(),
  base: {
    root: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    label: {
      textStyle: 'label',
    },
    dropzone: {
      alignItems: 'center',
      background: 'gray.bg.surface',
      borderRadius: 'md',
      borderStyle: 'dashed',
      borderWidth: '2px',
      display: 'flex',
      flexDirection: 'column',

      focusVisibleRing: 'outside',
      justifyContent: 'center',
      transition: 'background',
      width: 'full',
      _dragging: {
        background: 'gray.bg.surface.hover',
        borderStyle: 'solid',
        borderColor: 'colorPalette.bg.default',
      },
    },
    item: {
      alignItems: 'start',
      animationDuration: 'normal',
      animationName: 'fade-in',
      background: 'gray.bg.surface',
      borderRadius: 'md',
      borderWidth: '1px',
      display: 'flex',
      pos: 'relative',
      width: 'full',
    },
    itemGroup: {
      display: 'flex',
      alignItems: 'start',
      flexDirection: 'column',
      width: 'full',
    },
    itemName: {
      color: 'gray.fg.default',
      fontWeight: 'medium',
    },
    itemSizeText: {
      color: 'gray.fg.muted',
    },
    itemDeleteTrigger: {
      color: 'gray.fg.subtle',
    },
    itemPreviewImage: {
      aspectRatio: '1',
      objectFit: 'cover',
      maxW: '20',
      borderRadius: 'sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      md: {
        root: { gap: '4' },
        dropzone: { px: '6', py: '4', minHeight: 'xs', gap: '0' },
        item: { p: '4', gap: '3', textStyle: 'sm' },
        itemGroup: { gap: '3' },
        itemDeleteTrigger: { _icon: { boxSize: '4' } },
      },
    },
  },
})
