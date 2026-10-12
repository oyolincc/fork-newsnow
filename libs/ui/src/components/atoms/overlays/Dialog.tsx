'use client'
import { Dialog, useDialogContext } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { type ComponentProps, forwardRef } from 'react'
import { createSlotRecipeContext, styled } from 'styled-system/jsx'
import { dialog } from 'styled-system/recipes'

const { withRootProvider, withContext } = createSlotRecipeContext(dialog)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider(Dialog.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const RootProvider = withRootProvider(Dialog.RootProvider, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const Backdrop = withContext(Dialog.Backdrop, 'backdrop')
export const CloseTrigger = withContext(Dialog.CloseTrigger, 'closeTrigger')
export const Content = withContext(Dialog.Content, 'content')
export const Description = withContext(Dialog.Description, 'description')
export const Positioner = withContext(Dialog.Positioner, 'positioner')
export const Title = withContext(Dialog.Title, 'title')
export const Trigger = withContext(Dialog.Trigger, 'trigger')
export const Body = withContext(ark.div, 'body')
export const Header = withContext(ark.div, 'header')
export const Footer = withContext(ark.div, 'footer')

const StyledButton = styled(ark.button)

export const ActionTrigger = forwardRef<HTMLButtonElement, ComponentProps<typeof StyledButton>>(
  function ActionTrigger(props, ref) {
    const dialog = useDialogContext()
    const { onClick, ...rest } = props
    return (
      <StyledButton
        {...rest}
        ref={ref}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) dialog.setOpen(false)
        }}
      />
    )
  },
)

export { DialogContext as Context } from '@ark-ui/react/dialog'

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type BackdropProps = ComponentProps<typeof Backdrop>
export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type DescriptionProps = ComponentProps<typeof Description>
export type PositionerProps = ComponentProps<typeof Positioner>
export type TitleProps = ComponentProps<typeof Title>
export type TriggerProps = ComponentProps<typeof Trigger>
export type BodyProps = ComponentProps<typeof Body>
export type HeaderProps = ComponentProps<typeof Header>
export type FooterProps = ComponentProps<typeof Footer>
export type ActionTriggerProps = ComponentProps<typeof ActionTrigger>

export {
  useDialog,
  useDialogContext,
  type UseDialogProps,
  type UseDialogReturn,
  type DialogOpenChangeDetails as OpenChangeDetails,
  type DialogTriggerValueChangeDetails as TriggerValueChangeDetails,
} from '@ark-ui/react/dialog'
