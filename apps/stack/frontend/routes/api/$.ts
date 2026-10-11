import { createFileRoute } from '@tanstack/react-router'
import { handleApiRequest } from '#server-runtime'

const serve = async ({ request }: { request: Request }) => handleApiRequest(request)

export const Route = createFileRoute('/api/$')({
  server: {
    handlers: {
      GET: serve,
      POST: serve,
      PUT: serve,
      PATCH: serve,
      DELETE: serve,
      OPTIONS: serve,
      HEAD: serve,
    },
  },
})
