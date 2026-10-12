'use client'
import { Dialog } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { drawer } from 'styled-system/recipes'

const { withRootProvider, withContext } = createSlotRecipeContext(drawer)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider(Dialog.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const RootProvider = withRootProvider(Dialog.RootProvider, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const Backdrop = withContext(Dialog.Backdrop, 'backdrop')
export const Positioner = withContext(Dialog.Positioner, 'positioner')
export const CloseTrigger = withContext(Dialog.CloseTrigger, 'closeTrigger')
export const Content = withContext(Dialog.Content, 'content')
export const Description = withContext(Dialog.Description, 'description')
export const Title = withContext(Dialog.Title, 'title')
export const Trigger = withContext(Dialog.Trigger, 'trigger')

export const Body = withContext(ark.div, 'body')
export const Header = withContext(ark.div, 'header')
export const Footer = withContext(ark.div, 'footer')

export { DialogContext as Context } from '@ark-ui/react/dialog'

export {
  useDialog as useDrawer,
  type UseDialogProps as UseDrawerProps,
  type UseDialogReturn as UseDrawerReturn,
  type DialogOpenChangeDetails as OpenChangeDetails,
  type DialogTriggerValueChangeDetails as TriggerValueChangeDetails,
} from '@ark-ui/react/dialog'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type BackdropProps = ComponentProps<typeof Backdrop>
export type PositionerProps = ComponentProps<typeof Positioner>
export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type DescriptionProps = ComponentProps<typeof Description>
export type TitleProps = ComponentProps<typeof Title>
export type TriggerProps = ComponentProps<typeof Trigger>
export type BodyProps = ComponentProps<typeof Body>
export type HeaderProps = ComponentProps<typeof Header>
export type FooterProps = ComponentProps<typeof Footer>
