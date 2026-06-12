// ═════════════════════════════════════════════════════════════════════════════
// SERVICE DE RÉINITIALISATION
//
// Vide les endpoints autorisés (voir resetEndpointPolicy.ts) :
//   1. on liste tous les éléments (actifs + corbeille) via l'API v1,
//   2. on retire les éléments protégés (ex : utilisateurs id ≤ 6),
//   3. on PURGE le reste en UNE seule requête « bulk » par endpoint.
//
// POURQUOI v1 : l'API v2 (DELETE) ne fait que mettre en corbeille
// (is_deleted=true), elle ne purge JAMAIS. Seule l'API v1 avec force_purge=1
// supprime réellement de la base. La v1 sait aussi lister la corbeille.
//
// POURQUOI bulk : 1 requête purge tous les ids d'un type d'un coup (rapide),
// au lieu d'une requête par élément.
//
// POURQUOI par lots parallèles : on vide plusieurs endpoints en même temps
// (mais par paquets) pour aller vite sans saturer le serveur.
// ═════════════════════════════════════════════════════════════════════════════

import { v1BulkPurge, v1GetAllIncludingDeleted } from '@/api/glpiV1Client'
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'
import { executerParLots } from '@/utils/executerParLots'
import { RESETTABLE_ENDPOINTS } from './resetEndpointPolicy'

const log = creerLogger('Réinitialisation')

// Nombre d'endpoints vidés en parallèle dans un même lot.
const TAILLE_LOT = 5

/** Résultat de la réinitialisation d'UN endpoint (utilisé par la page). */
export type ResetResult = {
  endpoint: string
  success: boolean
  total: number // nombre d'éléments trouvés (hors protégés)
  deleted: number
  failed: number
  protected: number
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
// classe GLPI v1 ("Computer", "Ticket"…) : le dernier segment du chemin.
function versItemtypeV1(endpoint: string): string {
  const segments = endpoint.split('/').filter(Boolean)
  return segments[segments.length - 1] ?? endpoint
}

/**
 * Liste TOUS les éléments à purger : actifs ET en corbeille.
 * Sans la corbeille, les éléments déjà soft-deleted échappent au reset et
 * s'accumulent à chaque import.
 */
export async function previewReset(endpoint: string) {
  const itemtype = versItemtypeV1(endpoint)
  return v1GetAllIncludingDeleted<{ id?: number }>(itemtype)
}

/** Vide UN endpoint : liste, retire les protégés, purge le reste en bulk. */
export async function resetEndpoint(endpoint: string): Promise<ResetResult> {
  try {
    const policy = getResetPolicy(endpoint)
    const itemtype = versItemtypeV1(endpoint)

    const items = await previewReset(endpoint)
    log.info(`${endpoint} : ${items.length} élément(s) trouvé(s)`)

    // Séparer les ids à purger des ids protégés (ex : utilisateurs id ≤ 6).
    const idsAPurger: number[] = []
    let protectedCount = 0
    for (const item of items) {
      if (!item.id) {
        continue
      }
      if (policy.protectIdsUpTo && item.id <= policy.protectIdsUpTo) {
        protectedCount++
      } else {
        idsAPurger.push(item.id)
      }
    }

    if (idsAPurger.length === 0) {
      log.succes(`${endpoint} : rien à purger (${protectedCount} protégé(s))`)
      return { endpoint, success: true, total: 0, deleted: 0, failed: 0, protected: protectedCount }
    }

    // Une seule requête purge tous les ids de ce type.
    const { deleted, failed } = await v1BulkPurge(itemtype, idsAPurger)

    if (failed > 0) {
      log.attention(`${endpoint} : ${deleted} purgé(s), ${failed} échec(s)`)
    } else {
      log.succes(`${endpoint} : ${deleted} purgé(s), ${protectedCount} protégé(s)`)
    }

    return {
      endpoint,
      success: true,
      total: idsAPurger.length,
      deleted,
      failed,
      protected: protectedCount,
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
      error: message,
    }
  }
}

/** Vide plusieurs endpoints, par lots parallèles. */
export async function resetSelectedEndpoints(endpoints: string[]): Promise<ResetResult[]> {
  log.info(`Début — ${endpoints.length} endpoint(s) à vider`)

  // On remplit le tableau de résultats au fur et à mesure (même ordre que l'entrée).
  const results: ResetResult[] = []
  await executerParLots(endpoints, TAILLE_LOT, async (endpoint) => {
    const resultat = await resetEndpoint(endpoint)
    results.push(resultat)
  })

  log.succes('Réinitialisation terminée')
  return results
}
