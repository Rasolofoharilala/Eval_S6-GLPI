import { httpClient } from '@/api/httpClient'
import { RESETTABLE_ENDPOINTS } from './resetEndpointPolicy'

function getResetPolicy(endpoint: string) {
  const policy = RESETTABLE_ENDPOINTS.find((item) => item.endpoint === endpoint)

  if (!policy) {
    throw new Error(`Endpoint non autorisé : ${endpoint}`)
  }

  return policy
}

function buildDeleteUrl(deleteTarget: string, id: number) {
  return deleteTarget.replace(/\{[^}]+\}/g, String(id))
}

function getErrorMessage(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Erreur inconnue'
  }

  const err = error as {
    response?: {
      status?: number
      data?: {
        title?: string
        detail?: string
        message?: string
      }
    }
    message?: string
  }

  const status = err.response?.status
  const title = err.response?.data?.title
  const detail = err.response?.data?.detail
  const message = err.response?.data?.message || err.message

  return [status ? `HTTP ${status}` : null, title, detail, message].filter(Boolean).join(' - ')
}

export async function previewReset(endpoint: string) {
  console.log('Endpoint:', endpoint)

  const response = await httpClient.get(endpoint)

  if (Array.isArray(response.data)) {
    return response.data
  }

  if (Array.isArray(response.data?.data)) {
    return response.data.data
  }

  if (Array.isArray(response.data?.results)) {
    return response.data.results
  }

  return []
}

export async function resetOneItem(endpoint: string, id: number) {
  const policy = getResetPolicy(endpoint)

  const deleteUrl = buildDeleteUrl(policy.deleteTarget, id)

  await httpClient.delete(deleteUrl, {
    params: {
      force: true,
    },
  })

  return {
    id,
    status: 'deleted',
  }
}
export async function resetEndpoint(endpoint: string) {
  try {
    const items = await previewReset(endpoint)
    const results = []

    for (const item of items) {
      if (!item.id) {
        continue
      }

      try {
        const result = await resetOneItem(endpoint, Number(item.id))
        results.push(result)
      } catch (error) {
        results.push({
          id: item.id,
          status: 'failed',
          error: getErrorMessage(error),
        })
      }
    }

    const deleted = results.filter((item) => item.status === 'deleted').length

    const failed = results.filter((item) => item.status === 'failed').length

    return {
      endpoint,
      success: true,
      total: results.length,
      deleted,
      failed,
      results,
    }
  } catch (error) {
    return {
      endpoint,
      success: false,
      total: 0,
      deleted: 0,
      failed: 1,
      results: [],
      error: getErrorMessage(error),
    }
  }
}

export async function resetSelectedEndpoints(endpoints: string[]) {
  const results = []

  for (const endpoint of endpoints) {
    const result = await resetEndpoint(endpoint)
    results.push(result)
  }

  return results
}
