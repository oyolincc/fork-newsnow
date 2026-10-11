import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { ErrorMessage } from '#/components/general/ErrorMessage'
import { AppLayout } from '#/components/layouts/AppLayout'
import { Page } from '#/components/layouts/Page'
import { PageContainer } from '#/components/layouts/PageContainer'
import { ExampleForm } from '#/modules/example/components/ExampleForm'
import { ExampleList } from '#/modules/example/components/ExampleList'
import {
  useCreateExampleMutation,
  useExamplesQuery,
  useProcessExampleMutation,
} from '#/modules/example/hooks/api-hooks'
import { exampleMessageAtom } from '#/modules/example/stores'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [message, setMessage] = useAtom(exampleMessageAtom)
  const { data: examples, error: examplesError } = useExamplesQuery()
  const create = useCreateExampleMutation()
  const {
    data: processedExample,
    error: processError,
    isPending: isProcessing,
    mutate: processExample,
  } = useProcessExampleMutation()

  const save = async () => {
    await create.mutateAsync({ message })
    setMessage('')
  }

  return (
    <AppLayout>
      <PageContainer>
        <Page>
          <header>
            <h1 className="text-3xl font-bold">Example workspace</h1>
            <p className="text-zinc-400">Nitro mounts the independent Hono server under /api.</p>
          </header>
          <ExampleForm
            message={message}
            saving={create.isPending}
            processing={isProcessing}
            onMessageChange={setMessage}
            onSave={save}
            onProcess={() => processExample({ message })}
          />
          {processedExample && (
            <pre className="rounded bg-zinc-900 p-4">
              {JSON.stringify(processedExample, null, 2)}
            </pre>
          )}
          <ErrorMessage error={create.error || processError || examplesError} />
          <ExampleList examples={examples} />
        </Page>
      </PageContainer>
    </AppLayout>
  )
}
