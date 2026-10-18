import { css } from 'styled-system/css'
import type { Example } from '@newsnow/definition/frontend'

export function ExampleList({ examples }: { examples?: Example[] }) {
  return (
    <ul className={css({ display: 'grid', gap: '2' })}>
      {examples?.map((example) => (
        <li
          className={css({
            borderRadius: 'sm',
            borderWidth: 'px',
            borderColor: 'gray.border.default',
            p: '3',
          })}
          key={example.id}>
          {example.message}
        </li>
      ))}
    </ul>
  )
}
