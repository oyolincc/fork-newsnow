import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { heading } from 'styled-system/recipes'

export type HeadingProps = ComponentProps<typeof Heading>
export const Heading = styled('h2', heading)
