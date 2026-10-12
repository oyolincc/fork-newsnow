import { ark } from '@ark-ui/react/factory'
import { forwardRef, type ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { separator, type SeparatorVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const StyledSeparator: StyledComponent<typeof ark.span, SeparatorVariantProps> = styled(
  ark.span,
  separator,
)
export type SeparatorProps = ComponentProps<typeof StyledSeparator>

export const Separator = forwardRef<HTMLSpanElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', ...props },
  ref,
) {
  return (
    <StyledSeparator
      role="separator"
      aria-orientation={typeof orientation === 'string' ? orientation : undefined}
      {...props}
      orientation={orientation}
      ref={ref}
    />
  )
})
