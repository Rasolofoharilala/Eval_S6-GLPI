import { httpClient } from './httpClient'

// GLPI plafonne chaque réponse de liste à 100 éléments (en-tête
// `Content-Range: début-fin/total`). On boucle donc sur le `range` jusqu'à
// avoir tout récupéré.
//
// ATTENTION (quirk API v2.3) : sur certains endpoints, l'offset du `range` est
// IGNORÉ — `range=100-199` renvoie les MÊMES 100 premiers éléments que
// `range=0-99`. Une simple concaténation produirait alors des DOUBLONS (200
// lignes pour 120 réels) et manquerait les éléments 101+. Pour être robuste,
// on déduplique par `id` et on s'arrête dès qu'une page n'apporte aucun
// nouvel id (signe que l'offset n'avance pas).
const PAGE_SIZE = 100
const MAX_PAGES = 100 // garde-fou anti-boucle infinie (10 000 éléments max)

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
  const parId = new Map<number, T>() // dédupe par id, préserve l'ordre d'insertion
  let start = 0

  for (let page = 0; page < MAX_PAGES; page++) {
    const end = start + PAGE_SIZE - 1
    const response = await httpClient.get<T[]>(`${endpoint}${sep}range=${start}-${end}`)
    const chunk = Array.isArray(response.data) ? response.data : []

    // Ajoute les éléments encore inconnus (clé = id) et compte les nouveautés.
    let nouveaux = 0
    for (const item of chunk) {
      const id = (item as { id?: number }).id
      const cle = typeof id === 'number' ? id : parId.size + nouveaux
      if (!parId.has(cle)) {
        parId.set(cle, item)
        nouveaux++
      }
    }

    const total = parseTotalFromContentRange(response.headers?.['content-range'])

    // Arrêts : page incomplète, page vide, total atteint, ou aucune nouveauté
    // (offset ignoré → on tourne en rond, inutile de continuer).
    if (chunk.length < PAGE_SIZE) break
    if (total !== null && parId.size >= total) break
    if (nouveaux === 0) break

    start += PAGE_SIZE
  }

  return Array.from(parId.values())
}

// IMPORTANT : l'API v2 GLPI renvoie AUSSI les éléments en corbeille (is_deleted=true)
// par défaut — contrairement à l'API v1. Le paramètre `is_deleted=0` est ignoré.
// Le bon filtre est la syntaxe RSQL `filter=is_deleted==false`.
// À utiliser pour tous les comptages (dashboards) afin de ne voir que les actifs.
export async function getAllActifs<T>(endpoint: string): Promise<T[]> {
  const sep = endpoint.includes('?') ? '&' : '?'
  return getAll<T>(`${endpoint}${sep}filter=is_deleted==false`)
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
