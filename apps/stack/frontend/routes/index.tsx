import { Heading, Text } from '@newsnow/ui'
import { css } from 'styled-system/css'
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
            <Heading as="h1" size="3xl">
              Example workspace
            </Heading>
            <Text color="fg.muted">Nitro mounts the independent Hono server under /api.</Text>
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
            <pre
              className={css({
                borderRadius: 'sm',
                bg: 'gray.surface.bg',
                p: '4',
                overflowX: 'auto',
              })}>
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
