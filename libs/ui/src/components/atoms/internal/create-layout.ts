'use client'
import { createElement, forwardRef, type ElementType, type FunctionComponent } from 'react'
import type { DataAttrs } from 'styled-system/types'

export function createLayout<Props extends { as?: ElementType }, Element extends HTMLElement>(
  Component: FunctionComponent<Props>,
  element: ElementType,
  defaults?: Partial<Props> & DataAttrs,
) {
  return forwardRef<Element, Props & { asChild?: boolean }>(function Layout(props, ref) {
    return createElement(Component, {
      ...defaults,
      ...props,
      as: props.as || element,
      ref,
    } as Props)
  })
}
