import { Text } from '@newsnow/ui'
import { css } from 'styled-system/css'

export function Header() {
  return (
    <header className={css({ borderBottomWidth: 'px', borderColor: 'border', px: '8', py: '4' })}>
      <Text as="strong" fontWeight="bold">
        Hono fullstack
      </Text>
    </header>
  )
}
