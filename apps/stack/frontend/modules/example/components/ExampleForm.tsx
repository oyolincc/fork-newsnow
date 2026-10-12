import { Button, Field, Input } from '@newsnow/ui'
import type { FormEvent } from 'react'
import { css } from 'styled-system/css'

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
    <form
      className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '3' })}
      onSubmit={submit}>
      <Field.Root
        className={css({
          flex: '1',
          minW: '0',
          width: { base: 'full', sm: 'auto' },
          flexBasis: { base: 'full', sm: '0' },
        })}>
        <Field.Label>Message</Field.Label>
        <Input
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          placeholder="Message"
        />
      </Field.Root>
      <Button type="submit" variant="solid" loading={saving} disabled={!message.trim() || saving}>
        Save
      </Button>
      <Button
        type="button"
        variant="outline"
        loading={processing}
        disabled={!message.trim() || processing}
        onClick={onProcess}>
        Process
      </Button>
    </form>
  )
}
