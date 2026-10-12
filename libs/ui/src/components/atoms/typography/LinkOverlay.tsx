'use client'
import { ark } from '@ark-ui/react/factory'
import {
  LinkBox as PandaLinkBox,
  type LinkBoxProps as PandaLinkBoxProps,
  LinkOverlay as PandaLinkOverlay,
  type LinkOverlayProps as PandaLinkOverlayProps,
} from 'styled-system/jsx'
import { createLayout } from '@/components/atoms/internal/create-layout'

export type LinkBoxProps = PandaLinkBoxProps & { asChild?: boolean }
export const LinkBox = /* @__PURE__ */ createLayout<LinkBoxProps, HTMLDivElement>(
  PandaLinkBox,
  ark.div,
)
export type LinkOverlayProps = PandaLinkOverlayProps & { asChild?: boolean }
export const LinkOverlay = /* @__PURE__ */ createLayout<LinkOverlayProps, HTMLAnchorElement>(
  PandaLinkOverlay,
  ark.a,
  { 'data-link-overlay': '' },
)
