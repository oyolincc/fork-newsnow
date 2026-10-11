export function ErrorMessage({ error }: { error: unknown }) {
  if (!error) return null
  return <p className="text-red-400">{String(error)}</p>
}
