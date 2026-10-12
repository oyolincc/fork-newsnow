'use client'
import { ark } from '@ark-ui/react/factory'
import { Float as PandaFloat, type FloatProps as PandaFloatProps } from 'styled-system/jsx'
import { createLayout } from '@/components/atoms/internal/create-layout'

export type FloatProps = PandaFloatProps & { asChild?: boolean }
export const Float = /* @__PURE__ */ createLayout<FloatProps, HTMLDivElement>(PandaFloat, ark.div)
