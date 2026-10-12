'use client'
import { ark } from '@ark-ui/react/factory'
import { Steps } from '@ark-ui/react/steps'
import { CheckIcon } from 'lucide-react'
import { forwardRef, type ComponentProps, type ReactNode, type Provider } from 'react'
import { createSlotRecipeContext, styled } from 'styled-system/jsx'
import { steps, type StepsVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const {
  withProvider,
  withContext,
  PropsProvider: StepsPropsProvider,
} = createSlotRecipeContext(steps)

export const Root: StyledComponent<typeof Steps.Root, StepsVariantProps> = withProvider(
  Steps.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Steps.RootProvider, StepsVariantProps> =
  withProvider(Steps.RootProvider, 'root')
export type RootProps = ComponentProps<typeof Root>
export type RootProviderProps = ComponentProps<typeof RootProvider>
export const PropsProvider = StepsPropsProvider as Provider<RootProps>
export const List = withContext(Steps.List, 'list')
export const Item = withContext(Steps.Item, 'item')
export const Trigger = withContext(Steps.Trigger, 'trigger')
export const Content = withContext(Steps.Content, 'content')
export const CompletedContent = withContext(Steps.CompletedContent, 'content')
export const Title = withContext(ark.div, 'title')
export const Description = withContext(ark.div, 'description')
export const Separator = withContext(Steps.Separator, 'separator')
export const NextTrigger = withContext(Steps.NextTrigger, 'nextTrigger')
export const PrevTrigger = withContext(Steps.PrevTrigger, 'prevTrigger')

const StyledNumber: StyledComponent<typeof ark.div> = styled(ark.div)
export interface NumberProps extends ComponentProps<typeof StyledNumber> {}
export const Number = forwardRef<HTMLDivElement, NumberProps>(function Number(props, ref) {
  return (
    <Steps.ItemContext>
      {({ index }) => (
        <StyledNumber {...props} ref={ref}>
          {index + 1}
        </StyledNumber>
      )}
    </Steps.ItemContext>
  )
})

export interface StatusProps {
  complete: ReactNode
  incomplete: ReactNode
  current?: ReactNode
}
export function Status({ complete, incomplete, current }: StatusProps) {
  return (
    <Steps.ItemContext>
      {(item) => {
        if (item.current) return current == null ? incomplete : current
        return item.completed ? complete : incomplete
      }}
    </Steps.ItemContext>
  )
}

export const Indicator = withContext(Steps.Indicator, 'indicator', {
  defaultProps: { children: <Status complete={<CheckIcon />} incomplete={<Number />} /> },
})

export type ListProps = ComponentProps<typeof List>
export type ItemProps = ComponentProps<typeof Item>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ContentProps = ComponentProps<typeof Content>
export type CompletedContentProps = ComponentProps<typeof CompletedContent>
export type TitleProps = ComponentProps<typeof Title>
export type DescriptionProps = ComponentProps<typeof Description>
export type SeparatorProps = ComponentProps<typeof Separator>
export type IndicatorProps = ComponentProps<typeof Indicator>
export type NextTriggerProps = ComponentProps<typeof NextTrigger>
export type PrevTriggerProps = ComponentProps<typeof PrevTrigger>

export { StepsContext as Context, StepsItemContext as ItemContext } from '@ark-ui/react/steps'
export {
  useSteps,
  useStepsContext,
  useStepsItemContext,
  type UseStepsProps,
  type UseStepsReturn,
  type StepChangeDetails as ChangeDetails,
  type StepInvalidDetails as InvalidDetails,
} from '@ark-ui/react/steps'
