import { Text } from '@newsnow/ui'
import { css } from 'styled-system/css'

export function Header() {
  return (
    <header
      className={css({
        bg: 'gray.bg.surface',
        borderBottomWidth: 'px',
        borderColor: 'gray.border.subtle',
        px: '8',
        py: '4',
      })}>
      <Text as="strong" fontWeight="semibold">
        Hono fullstack
      </Text>
    </header>
  )
}
