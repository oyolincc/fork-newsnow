'use client'
import { Avatar } from '@ark-ui/react/avatar'
import { UserIcon } from 'lucide-react'
import { type ComponentProps, forwardRef } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { avatar, type AvatarVariantProps } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(avatar)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof Avatar.Root, AvatarVariantProps> = withProvider(
  Avatar.Root,
  'root',
)
export const RootProvider: StyledComponent<typeof Avatar.RootProvider, AvatarVariantProps> =
  withProvider(Avatar.RootProvider, 'root')
export const Image = withContext(Avatar.Image, 'image', {
  defaultProps: {
    draggable: 'false',
    referrerPolicy: 'no-referrer',
  },
})

export { AvatarContext as Context } from '@ark-ui/react/avatar'

export interface FallbackProps extends ComponentProps<typeof StyledFallback> {
  /**
   * The name to derive the initials from.
   * If not provided, the fallback will display a generic icon.
   */
  name?: string | undefined
}

const StyledFallback: StyledComponent<typeof Avatar.Fallback> = withContext(
  Avatar.Fallback,
  'fallback',
)

export const Fallback = forwardRef<HTMLDivElement, FallbackProps>(function Fallback(props, ref) {
  const { name, children, asChild, ...rest } = props
  const names = name?.trim().split(/\s+/) || []
  const initials =
    (names[0]?.[0] || '') + (names.length > 1 ? names[names.length - 1]?.[0] || '' : '')

  const fallbackContent = children !== undefined || asChild ? children : initials || <UserIcon />

  return (
    <StyledFallback ref={ref} asChild={asChild} {...rest}>
      {fallbackContent}
    </StyledFallback>
  )
})

export type RootProviderProps = ComponentProps<typeof RootProvider>
export type ImageProps = ComponentProps<typeof Image>

export {
  useAvatar,
  useAvatarContext,
  type UseAvatarProps,
  type UseAvatarReturn,
  type AvatarStatusChangeDetails as StatusChangeDetails,
} from '@ark-ui/react/avatar'
