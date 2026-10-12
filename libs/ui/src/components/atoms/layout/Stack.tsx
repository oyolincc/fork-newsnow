'use client'
import { ark } from '@ark-ui/react/factory'
import {
  Children,
  cloneElement,
  Fragment,
  forwardRef,
  isValidElement,
  type ReactElement,
  type FunctionComponent,
} from 'react'
import {
  Stack as PandaStack,
  HStack as PandaHStack,
  VStack as PandaVStack,
  type ComponentStackProps as PandaStackProps,
} from 'styled-system/jsx'

export interface StackProps extends PandaStackProps {
  asChild?: boolean
  separator?: ReactElement<Record<string, unknown>>
}

function createStack(Component: FunctionComponent<PandaStackProps>) {
  return forwardRef<HTMLDivElement, StackProps>(function Stack(
    { separator, children, ...props },
    ref,
  ) {
    const items = Children.toArray(children)
    return (
      <Component
        {...props}
        as={props.as || ark.div}
        data-stack-separated={isValidElement(separator) ? '' : undefined}
        ref={ref}>
        {isValidElement(separator)
          ? items.map((child, index) => (
              <Fragment key={isValidElement(child) ? child.key || index : index}>
                {child}
                {index < items.length - 1 &&
                  cloneElement(separator, { 'data-stack-separator': '' })}
              </Fragment>
            ))
          : children}
      </Component>
    )
  })
}

export const Stack = /* @__PURE__ */ createStack(PandaStack)
export const HStack = /* @__PURE__ */ createStack(PandaHStack)
export const VStack = /* @__PURE__ */ createStack(PandaVStack)
export type HStackProps = StackProps
export type VStackProps = StackProps
