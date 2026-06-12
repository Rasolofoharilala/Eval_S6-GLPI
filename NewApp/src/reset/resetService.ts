// ═════════════════════════════════════════════════════════════════════════════
// SERVICE DE RÉINITIALISATION
//
// Vide les endpoints autorisés (voir resetEndpointPolicy.ts) :
// on liste les éléments actifs (GET v2, corbeille exclue) puis on les PURGE
// un par un via l'API v1 (force_purge=1).
//
// POURQUOI v1 POUR LA SUPPRESSION : l'API v2 (DELETE) ne fait que mettre en
// corbeille (is_deleted=true) — elle ne purge JAMAIS, même avec force_purge.
// Les éléments réapparaissent donc à chaque rechargement. Seule l'API v1 avec
// force_purge=1 supprime réellement de la base.
//
// Les éléments protégés (ex : utilisateurs id ≤ 6) ne sont jamais supprimés.
// ═════════════════════════════════════════════════════════════════════════════

import axios from 'axios'
import { v1Purge, v1GetAllIncludingDeleted } from '@/api/glpiV1Client'
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

// Convertit un endpoint v2 ("/Assets/Computer", "/Assistance/Ticket"…) en
// classe GLPI v1 utilisée pour la purge ("Computer", "Ticket"…).
// La classe v1 est simplement le dernier segment du chemin.
function versItemtypeV1(endpoint: string): string {
  const segments = endpoint.split('/').filter(Boolean)
  return segments[segments.length - 1] ?? endpoint
}

/**
 * Liste TOUS les éléments à purger : actifs ET en corbeille.
 *
 * On passe par l'API v1 : elle pagine correctement et permet de lister la
 * corbeille (is_deleted=1). Sans ça, les éléments déjà en corbeille (ex :
 * tickets soft-deleted) échappent au reset et s'accumulent à chaque import.
 */
export async function previewReset(endpoint: string) {
  const itemtype = versItemtypeV1(endpoint)
  return v1GetAllIncludingDeleted<{ id?: number }>(itemtype)
}

/** Purge DÉFINITIVEMENT un élément via l'API v1 (404 = déjà supprimé, ignoré). */
export async function resetOneItem(endpoint: string, id: number) {
  const itemtype = versItemtypeV1(endpoint)

  try {
    await v1Purge(itemtype, id)
  } catch (err) {
    // 404 = élément déjà supprimé entre le GET et le DELETE : on l'ignore
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return { id, status: 'deleted' as const }
    }
    throw err
  }

  return { id, status: 'deleted' as const }
}

/** Vide UN endpoint : liste les actifs puis purge chaque élément non protégé. */
export async function resetEndpoint(endpoint: string): Promise<ResetResult> {
  try {
    const policy = getResetPolicy(endpoint)
    const items = await previewReset(endpoint)
    log.info(`${endpoint} : ${items.length} élément(s) actif(s) trouvé(s)`)

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
      log.attention(`${endpoint} : ${deleted} purgé(s), ${failed} échec(s)`)
    } else {
      log.succes(`${endpoint} : ${deleted} purgé(s), ${protectedCount} protégé(s)`)
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
