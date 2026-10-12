'use client'
import { ark } from '@ark-ui/react/factory'
import { CheckCircleIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { type ComponentProps, createContext, forwardRef, useContext } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { alert, type AlertVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(alert)

const StyledRoot: StyledComponent<typeof ark.div, AlertVariantProps> = withProvider(ark.div, 'root')
export type RootProps = ComponentProps<typeof StyledRoot>
const StatusContext = createContext<RootProps['status']>('info')

export const Root = forwardRef<HTMLDivElement, RootProps>(function Root(props, ref) {
  return (
    <StatusContext.Provider value={props.status || 'info'}>
      <StyledRoot ref={ref} {...props} />
    </StatusContext.Provider>
  )
})
export const Title = withContext(ark.h3, 'title')
export const Description = withContext(ark.div, 'description')
export const Content = withContext(ark.div, 'content')

export type IndicatorProps = ComponentProps<typeof StyledIndicator>
const StyledIndicator: StyledComponent<typeof ark.span> = withContext(ark.span, 'indicator')

const iconMap = {
  info: InfoIcon,
  warning: TriangleAlertIcon,
  success: CheckCircleIcon,
  error: TriangleAlertIcon,
  neutral: InfoIcon,
}

export const Indicator = forwardRef<HTMLSpanElement, IndicatorProps>(
  function Indicator(props, ref) {
    const { children, asChild, ...rest } = props
    const status = useContext(StatusContext)
    const StatusIcon = typeof status === 'string' ? iconMap[status] : undefined
    return (
      <StyledIndicator ref={ref} asChild={asChild} {...rest}>
        {asChild || children !== undefined ? children : StatusIcon && <StatusIcon />}
      </StyledIndicator>
    )
  },
)

export type TitleProps = ComponentProps<typeof Title>
export type DescriptionProps = ComponentProps<typeof Description>
export type ContentProps = ComponentProps<typeof Content>
