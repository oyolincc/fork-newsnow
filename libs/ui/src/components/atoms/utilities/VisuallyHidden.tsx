'use client'
import { ark } from '@ark-ui/react/factory'
import {
  VisuallyHidden as PandaVisuallyHidden,
  type VisuallyHiddenProps as PandaVisuallyHiddenProps,
} from 'styled-system/jsx'
import { createLayout } from '@/components/atoms/internal/create-layout'

export type VisuallyHiddenProps = PandaVisuallyHiddenProps & { asChild?: boolean }
export const VisuallyHidden = /* @__PURE__ */ createLayout<VisuallyHiddenProps, HTMLDivElement>(
  PandaVisuallyHidden,
  ark.div,
)
