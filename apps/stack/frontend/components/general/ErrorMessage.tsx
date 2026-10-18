import { Text } from '@newsnow/ui'

export function ErrorMessage({ error }: { error: unknown }) {
  if (!error) return null
  return <Text color="red.fg.default">{String(error)}</Text>
}
