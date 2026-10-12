import { XIcon } from 'lucide-react'
import { forwardRef } from 'react'
import { IconButton, type IconButtonProps } from './IconButton'

export type CloseButtonProps = IconButtonProps

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <IconButton variant="plain" colorPalette="gray" aria-label="Close" ref={ref} {...props}>
        {props.children ?? <XIcon />}
      </IconButton>
    )
  },
)
