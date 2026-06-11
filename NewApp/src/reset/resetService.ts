// ═════════════════════════════════════════════════════════════════════════════
// SERVICE DE RÉINITIALISATION
//
// Vide les endpoints autorisés (voir resetEndpointPolicy.ts) :
// on liste les éléments (GET) puis on les supprime UN PAR UN (DELETE).
// Les éléments protégés (ex : utilisateurs id ≤ 6) ne sont jamais supprimés.
// ═════════════════════════════════════════════════════════════════════════════

import { httpClient } from '@/api/httpClient'
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'
import { RESETTABLE_ENDPOINTS } from './resetEndpointPolicy'

const log = creerLogger('Réinitialisation')

/** Résultat de la suppression d'UN élément. */
export type ResetItemResult = {
  id: number
  status: 'deleted' | 'failed'
  error?: string
}

/** Résultat de la réinitialisation d'UN endpoint (utilisé par la page). */
export type ResetResult = {
  endpoint: string
  success: boolean
  total: number
  deleted: number
  failed: number
  protected: number
  results: ResetItemResult[]
  error?: string
}

function getResetPolicy(endpoint: string) {
  const policy = RESETTABLE_ENDPOINTS.find((item) => item.endpoint === endpoint)

  if (!policy) {
    throw new Error(`Endpoint non autorisé : ${endpoint}`)
  }

  return policy
}

function buildDeleteUrl(deleteTarget: string, id: number) {
  // "/Assets/Computer/{id}" + 12 → "/Assets/Computer/12"
  return deleteTarget.replace(/\{[^}]+\}/g, String(id))
}

/** Liste les éléments d'un endpoint (sans rien supprimer). */
export async function previewReset(endpoint: string) {
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

/** Supprime UN élément (DELETE avec force=true pour ignorer la corbeille). */
export async function resetOneItem(endpoint: string, id: number) {
  const policy = getResetPolicy(endpoint)
  const deleteUrl = buildDeleteUrl(policy.deleteTarget, id)

  await httpClient.delete(deleteUrl, {
    params: { force: true, history: false },
  })

  return { id, status: 'deleted' as const }
}

/** Vide UN endpoint : liste puis supprime chaque élément non protégé. */
export async function resetEndpoint(endpoint: string): Promise<ResetResult> {
  try {
    const policy = getResetPolicy(endpoint)
    const items = await previewReset(endpoint)
    log.info(`${endpoint} : ${items.length} élément(s) trouvé(s)`)

    const results: ResetItemResult[] = []
    let protectedCount = 0

    for (const item of items) {
      if (!item.id) {
        continue
      }

      // Comptes/éléments par défaut protégés (ex : utilisateurs id ≤ 6)
      if (policy.protectIdsUpTo && Number(item.id) <= policy.protectIdsUpTo) {
        protectedCount++
        continue
      }

      try {
        results.push(await resetOneItem(endpoint, Number(item.id)))
      } catch (error) {
        results.push({ id: item.id, status: 'failed', error: messageErreur(error) })
      }
    }

    const deleted = results.filter((item) => item.status === 'deleted').length
    const failed = results.filter((item) => item.status === 'failed').length

    if (failed > 0) {
      log.attention(`${endpoint} : ${deleted} supprimé(s), ${failed} échec(s)`)
    } else {
      log.succes(`${endpoint} : ${deleted} supprimé(s), ${protectedCount} protégé(s)`)
    }

    return {
      endpoint,
      success: true,
      total: results.length,
      deleted,
      failed,
      protected: protectedCount,
      results,
    }
  } catch (error) {
    const message = messageErreur(error)
    log.erreur(`${endpoint} : ${message}`)

    return {
      endpoint,
      success: false,
      total: 0,
      deleted: 0,
      failed: 1,
      protected: 0,
      results: [],
      error: message,
    }
  }
}

/** Vide plusieurs endpoints, l'un après l'autre. */
export async function resetSelectedEndpoints(endpoints: string[]): Promise<ResetResult[]> {
  log.info(`Début — ${endpoints.length} endpoint(s) à vider`)

  const results: ResetResult[] = []
  for (const endpoint of endpoints) {
    results.push(await resetEndpoint(endpoint))
  }

  log.succes('Réinitialisation terminée')
  return results
}
