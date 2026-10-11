import type { FormEvent } from 'react'

interface ExampleFormProps {
  message: string
  saving: boolean
  processing: boolean
  onMessageChange: (message: string) => void
  onSave: () => Promise<void>
  onProcess: () => void
}

export function ExampleForm({
  message,
  saving,
  processing,
  onMessageChange,
  onSave,
  onProcess,
}: ExampleFormProps) {
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    await onSave()
  }

  return (
    <form className="flex gap-2" onSubmit={submit}>
      <input
        className="min-w-0 flex-1 rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
        value={message}
        onChange={(event) => onMessageChange(event.target.value)}
        placeholder="Message"
      />
      <button className="rounded bg-blue-600 px-4 py-2" disabled={!message.trim() || saving}>
        Save
      </button>
      <button
        className="rounded bg-emerald-600 px-4 py-2"
        type="button"
        disabled={!message.trim() || processing}
        onClick={onProcess}>
        Process
      </button>
    </form>
  )
}
