'use client'
import { ark } from '@ark-ui/react/factory'
import { useFieldContext } from '@ark-ui/react/field'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useId, useState, type ComponentProps, type ReactNode } from 'react'
import { styled } from 'styled-system/jsx'
import { IconButton } from '@/components/atoms/buttons/IconButton'
import { Input, type InputProps } from './Input'

const Root = styled(ark.div, { base: { position: 'relative', width: 'full' } })

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  visibilityIcon?: { on: ReactNode; off: ReactNode }
  rootProps?: ComponentProps<typeof Root>
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      defaultVisible = false,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <EyeIcon />, off: <EyeOffIcon /> },
      rootProps,
      ...props
    },
    ref,
  ) {
    const [localVisible, setLocalVisible] = useState(defaultVisible)
    const field = useFieldContext()
    const generatedId = useId()
    const id = props.id || field?.ids.control || generatedId
    const visible = visibleProp !== undefined ? visibleProp : localVisible
    const disabled = Boolean(props.disabled || field?.disabled)

    return (
      <Root {...rootProps}>
        <Input
          paddingInlineEnd="var(--input-height, 2.5em)"
          {...props}
          id={id}
          disabled={disabled}
          ref={ref}
          type={visible ? 'text' : 'password'}
        />
        <IconButton
          type="button"
          variant="plain"
          size="sm"
          disabled={disabled}
          position="absolute"
          insetInlineEnd="1"
          top="50%"
          transform="translateY(-50%)"
          height="calc(100% - 8px)"
          aspectRatio="square"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-controls={id}
          aria-pressed={visible}
          onPointerDown={(event) => {
            if (event.button === 0) event.preventDefault()
          }}
          onClick={() => {
            const next = !visible
            if (visibleProp === undefined) setLocalVisible(next)
            onVisibleChange?.(next)
          }}>
          {visible ? visibilityIcon.off : visibilityIcon.on}
        </IconButton>
      </Root>
    )
  },
)
