import ky, { HTTPError, type Options } from 'ky'
import { NetworkDefaults } from './constants'
import { parseApiError } from './errors'

const client = ky.create({
  prefix: NetworkDefaults.API_PREFIX,
  timeout: NetworkDefaults.TIMEOUT,
  retry: 0,
})

export async function request<T>(path: string, options?: Options) {
  try {
    const response = await client(path, options).json<{ data: T }>()
    return response.data
  } catch (error) {
    if (error instanceof HTTPError) throw await parseApiError(error)
    throw error
  }
}
