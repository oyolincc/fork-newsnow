'use client'
import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { createSlotRecipeContext } from 'styled-system/jsx'
import { card, type CardVariantProps } from 'styled-system/recipes'

import type { StyledComponent } from 'styled-system/types'

const { withProvider, withContext } = createSlotRecipeContext(card)

export type RootProps = ComponentProps<typeof Root>
export const Root: StyledComponent<typeof ark.div, CardVariantProps> = withProvider(ark.div, 'root')
export const Header = withContext(ark.div, 'header')
export const Body = withContext(ark.div, 'body')
export const Footer = withContext(ark.div, 'footer')
export const Title = withContext(ark.h3, 'title')
export const Description = withContext(ark.div, 'description')

export type HeaderProps = ComponentProps<typeof Header>
export type BodyProps = ComponentProps<typeof Body>
export type FooterProps = ComponentProps<typeof Footer>
export type TitleProps = ComponentProps<typeof Title>
export type DescriptionProps = ComponentProps<typeof Description>
