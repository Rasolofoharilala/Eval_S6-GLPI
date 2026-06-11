import { httpClient } from '@/api/httpClient'
import type { GlpiReferenceItem } from './glpiReferenceTypes'

const cache = new Map<string, GlpiReferenceItem>()

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function buildCacheKey(endpoint: string, name: string): string {
  return `${endpoint}:${normalize(name)}`
}

function normalizeResponse(data: unknown): GlpiReferenceItem[] {
  if (Array.isArray(data)) {
    return data
      .filter((item) => item && typeof item === 'object')
      .map((item) => {
        const record = item as Record<string, unknown>
        return {
          id: Number(record.id),
          name: String(record.name ?? ''),
        }
      })
      .filter((item) => item.id && item.name)
  }

  if (typeof data === 'object' && data !== null) {
    const record = data as Record<string, unknown>

    if (Array.isArray(record.data)) {
      return normalizeResponse(record.data)
    }

    if (Array.isArray(record.results)) {
      return normalizeResponse(record.results)
    }
  }

  return []
}

async function findReferenceByName(
  endpoint: string,
  name: string,
): Promise<GlpiReferenceItem | null> {
  const cacheKey = buildCacheKey(endpoint, name)

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) ?? null
  }

  const response = await httpClient.get(endpoint)

  const items = normalizeResponse(response.data)

  const found = items.find((item) => normalize(item.name) === normalize(name))

  if (!found) {
    return null
  }

  cache.set(cacheKey, found)

  return found
}

async function createReferenceByName(endpoint: string, name: string): Promise<GlpiReferenceItem> {
  const response = await httpClient.post(endpoint, {
    name,
  })

  const id = response.data?.id ?? response.data?.data?.id

  if (!id) {
    throw new Error(`Impossible de récupérer l'id créé pour ${name}`)
  }

  const created = {
    id: Number(id),
    name,
  }

  cache.set(buildCacheKey(endpoint, name), created)

  return created
}

export async function ensureReferenceByName(
  endpoint: string,
  name: string,
  autoCreate = true,
): Promise<GlpiReferenceItem | null> {
  if (!name || name.trim() === '') {
    return null
  }

  const existing = await findReferenceByName(endpoint, name)

  if (existing) {
    return existing
  }

  if (!autoCreate) {
    return null
  }

  return await createReferenceByName(endpoint, name)
}
