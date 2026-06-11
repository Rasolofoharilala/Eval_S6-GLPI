import { httpClient } from './httpClient'

// GLPI plafonne chaque réponse de liste à 100 éléments et renvoie l'en-tête
// `Content-Range: début-fin/total` (statut 206 Partial Content). Sans
// pagination, getAll ne verrait jamais plus de 100 éléments — ce qui fausse
// tous les comptages des dashboards. On boucle donc sur le `range` jusqu'à
// avoir récupéré la totalité.
const PAGE_SIZE = 100

function parseTotalFromContentRange(header: unknown): number | null {
  // Format attendu : "0-99/453" → total = 453
  if (typeof header !== 'string') return null
  const slash = header.lastIndexOf('/')
  if (slash === -1) return null
  const total = Number(header.slice(slash + 1))
  return Number.isFinite(total) ? total : null
}

export async function getAll<T>(endpoint: string): Promise<T[]> {
  const sep = endpoint.includes('?') ? '&' : '?'
  const items: T[] = []
  let start = 0

  for (;;) {
    const end = start + PAGE_SIZE - 1
    const response = await httpClient.get<T[]>(`${endpoint}${sep}range=${start}-${end}`)
    const chunk = Array.isArray(response.data) ? response.data : []
    items.push(...chunk)

    const total = parseTotalFromContentRange(response.headers?.['content-range'])

    // Conditions d'arrêt : page incomplète (dernière tranche), réponse vide,
    // ou total atteint d'après l'en-tête Content-Range.
    if (chunk.length < PAGE_SIZE) break
    if (total !== null && items.length >= total) break

    start += PAGE_SIZE
  }

  return items
}

export async function getById<T>(endpoint: string, id: number): Promise<T> {
  const response = await httpClient.get<T>(`${endpoint}/${id}`)
  return response.data
}

export async function create<T, Payload>(endpoint: string, payload: Payload): Promise<T> {
  const response = await httpClient.post<T>(endpoint, payload)
  return response.data
}

export async function update<T, Payload>(
  endpoint: string,
  id: number,
  payload: Payload,
): Promise<T> {
  const response = await httpClient.patch<T>(`${endpoint}/${id}`, payload)
  return response.data
}

export async function remove<T>(endpoint: string, id: number): Promise<T> {
  const response = await httpClient.delete<T>(`${endpoint}/${id}`)
  return response.data
}
