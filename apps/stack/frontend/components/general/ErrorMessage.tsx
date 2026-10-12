import { Text } from '@newsnow/ui'

export function ErrorMessage({ error }: { error: unknown }) {
  if (!error) return null
  return <Text color="error">{String(error)}</Text>
}
