import { httpClient } from '@/api/httpClient'
import type { ResetPreview, ResetPreviewItem, ResetResult, ResetResultItem } from './resetTypes'

function normalizeItems(data: unknown): ResetPreviewItem[] {
  if (!Array.isArray(data)) {
    return []
  }

  return data
    .filter((item) => item && typeof item === 'object' && 'id' in item)
    .map((item: any) => {
      const name = item.name || item.username || item.realname || item.title || ''

      return {
        id: Number(item.id),
        name,
        displayName: name ? `#${item.id} - ${name}` : `#${item.id}`,
      }
    })
}

function extractApiError(error: any): string {
  return (
    error?.response?.data?.title ||
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    'Erreur inconnue'
  )
}

function extractStatusCode(error: any): number | undefined {
  return error?.response?.status
}

export async function previewReset(endpoint: string): Promise<ResetPreview> {
  const response = await httpClient.get(endpoint)

  const items = normalizeItems(response.data)

  return {
    endpoint,
    count: items.length,
    items,
  }
}

export async function resetEndpoint(endpoint: string, deleteTarget?: string): Promise<ResetResult> {
  const preview = await previewReset(endpoint)

  const results: ResetResultItem[] = []

  for (const item of preview.items) {
    try {
      let deleteUrl = `${endpoint}/${item.id}`

      if (deleteTarget) {
        const hasPlaceholder = /\{[^}]+\}/.test(deleteTarget)
        deleteUrl = hasPlaceholder
          ? deleteTarget.replace(/\{[^}]+\}/g, String(item.id))
          : `${deleteTarget.replace(/\/$/, '')}/${item.id}`
      }

      await httpClient.delete(deleteUrl)

      results.push({
        id: item.id,
        name: item.name,
        status: 'deleted',
      })
    } catch (error: any) {
      results.push({
        id: item.id,
        name: item.name,
        status: 'failed',
        error: extractApiError(error),
        statusCode: extractStatusCode(error),
      })
    }
  }

  const deleted = results.filter((item) => item.status === 'deleted').length
  const failed = results.filter((item) => item.status === 'failed').length

  return {
    endpoint,
    total: results.length,
    deleted,
    failed,
    results,
  }
}
