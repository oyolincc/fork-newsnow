'use client'
import { ark } from '@ark-ui/react/factory'
import { type ComponentProps, forwardRef, type ReactNode } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { inputGroup, type InputGroupVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(inputGroup)

type RootProps = ComponentProps<typeof Root>
const Root: StyledComponent<typeof ark.div, InputGroupVariantProps> = withProvider(ark.div, 'root')
const Element = withContext(ark.div, 'element')

export interface InputGroupProps extends RootProps {
  startElement?: ReactNode | undefined
  endElement?: ReactNode | undefined
  startElementProps?: ComponentProps<typeof Element> | undefined
  endElementProps?: ComponentProps<typeof Element> | undefined
  /** CSS length subtracted from the default start padding, e.g. "-2rem" for a wider element. */
  startOffset?: string | undefined
  /** CSS length subtracted from the default end padding. */
  endOffset?: string | undefined
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const {
      startElement,
      endElement,
      startElementProps,
      endElementProps,
      startOffset,
      endOffset,
      children,
      ...rest
    } = props

    return (
      <Root
        ref={ref}
        {...rest}
        style={{
          ...(startOffset !== undefined && { '--input-group-start-offset': startOffset }),
          ...(endOffset !== undefined && { '--input-group-end-offset': endOffset }),
          ...rest.style,
        }}>
        {startElement != null && (
          <Element insetInlineStart="0" top="0" {...startElementProps}>
            {startElement}
          </Element>
        )}
        {children}
        {endElement != null && (
          <Element insetInlineEnd="0" top="0" {...endElementProps}>
            {endElement}
          </Element>
        )}
      </Root>
    )
  },
)
