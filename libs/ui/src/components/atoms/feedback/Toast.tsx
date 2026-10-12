'use client'
import { Portal } from '@ark-ui/react/portal'
import { Toaster as ArkToaster, Toast, useToastContext } from '@ark-ui/react/toast'
import { CheckCircleIcon, CircleAlertIcon, CircleXIcon } from 'lucide-react'
import { forwardRef, type ComponentProps } from 'react'
import { createSlotRecipeContext, PandaStack as Stack, styled } from 'styled-system/jsx'
import { toast, type ToastVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'
import { CloseButton } from '@/components/atoms/buttons/CloseButton'
import { Icon, type IconProps } from '@/components/atoms/data-display/Icon'
import { Spinner } from './Spinner'

const { withProvider, withContext } = createSlotRecipeContext(toast)

export const Root: StyledComponent<typeof Toast.Root, ToastVariantProps> = withProvider(
  Toast.Root,
  'root',
)
export const Title = withContext(Toast.Title, 'title')
export const Description = withContext(Toast.Description, 'description')
export const ActionTrigger = withContext(Toast.ActionTrigger, 'actionTrigger')
export const CloseTrigger = withContext(Toast.CloseTrigger, 'closeTrigger')
const StyledToaster = styled(ArkToaster)

const iconMap: Record<string, React.ElementType> = {
  warning: CircleAlertIcon,
  success: CheckCircleIcon,
  error: CircleXIcon,
}

export type IndicatorProps = IconProps
export const Indicator = forwardRef<SVGSVGElement, IndicatorProps>((props, ref) => {
  const toast = useToastContext()

  const StatusIcon = iconMap[toast.type]
  if (!StatusIcon) return null

  return (
    <Icon ref={ref} data-type={toast.type} {...props}>
      <StatusIcon />
    </Icon>
  )
})

export {
  createToaster,
  type CreateToasterProps,
  type CreateToasterReturn,
} from '@ark-ui/react/toast'

export type ToasterProps = Omit<ComponentProps<typeof StyledToaster>, 'children'> & {
  children?: ComponentProps<typeof StyledToaster>['children']
}

export const Toaster = forwardRef<HTMLDivElement, ToasterProps>(function Toaster(
  { children, ...props },
  ref,
) {
  return (
    <Portal>
      <StyledToaster ref={ref} zIndex="toast" insetInline={{ mdDown: '4' }} {...props}>
        {children ||
          ((toast) => (
            <Root>
              {toast.type === 'loading' ? (
                <Spinner color="colorPalette.fg.default" />
              ) : (
                <Indicator />
              )}

              <Stack gap="3" alignItems="start">
                <Stack gap="1">
                  {toast.title && <Title>{toast.title}</Title>}
                  {toast.description && <Description>{toast.description}</Description>}
                </Stack>
                {toast.action && <ActionTrigger>{toast.action.label}</ActionTrigger>}
              </Stack>
              {toast.closable && (
                <CloseTrigger asChild>
                  <CloseButton size="sm" aria-label="关闭通知" />
                </CloseTrigger>
              )}
            </Root>
          ))}
      </StyledToaster>
    </Portal>
  )
})

export type RootProps = ComponentProps<typeof Root>
export type TitleProps = ComponentProps<typeof Title>
export type DescriptionProps = ComponentProps<typeof Description>
export type ActionTriggerProps = ComponentProps<typeof ActionTrigger>
export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>

export {
  useToastContext,
  type ToastStatusChangeDetails as StatusChangeDetails,
} from '@ark-ui/react/toast'
