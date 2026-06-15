// ═════════════════════════════════════════════════════════════════════════════
// CRUD GÉNÉRIQUE — la base de toutes les opérations sur N'IMPORTE QUEL endpoint
//
// Tous les CRUD spécialisés (tickets, parc, références, utilisateurs) s'appuient
// sur ces fonctions. À utiliser directement quand on n'a pas de CRUD dédié.
//
// Exemple :
//   import { lister, parId, creer, modifierUnChamp, supprimer } from '@/crud'
//   const ordis = await listerActifs('/Assets/Computer')
//   await modifierUnChamp('/Assets/Computer', 12, 'name', 'PC-RENOMME')
//
// RAPPELS GLPI (gérés ici) :
//   - status / relations s'envoient en objet { id: N }
//   - l'API v2 DELETE ne fait que mettre en CORBEILLE → la vraie purge passe v1
// ═════════════════════════════════════════════════════════════════════════════

import { getAll, getAllActifs, getById, create, update, remove } from '@/api/crudClient'
import { v1BulkPurge } from '@/api/glpiV1Client'

// Élément GLPI minimal : il a au moins un id.
export type ElementGlpi = { id?: number; name?: string | null }

// Le dernier segment d'un endpoint v2 = la classe v1 ("/Assets/Computer" → "Computer").
function classeV1(endpoint: string): string {
  const parts = endpoint.split('/').filter(Boolean)
  return parts[parts.length - 1] ?? endpoint
}

// Transforme un id en relation GLPI { id } (ou undefined si 0/absent).
export function relation(id?: number) {
  return id ? { id } : undefined
}

/** READ — Liste TOUT (y compris la corbeille selon l'endpoint). */
export function lister<T = ElementGlpi>(endpoint: string): Promise<T[]> {
  return getAll<T>(endpoint)
}

/** READ — Liste seulement les éléments actifs (corbeille exclue). À privilégier. */
export function listerActifs<T = ElementGlpi>(endpoint: string): Promise<T[]> {
  return getAllActifs<T>(endpoint)
}

/** READ — Un seul élément par son id. */
export function parId<T = ElementGlpi>(endpoint: string, id: number): Promise<T> {
  return getById<T>(endpoint, id)
}

/** CREATE — Crée un élément. `donnees` = les champs (ex : { name, status: {id} }). */
export function creer<T = ElementGlpi>(endpoint: string, donnees: object): Promise<T> {
  return create<T, object>(endpoint, donnees)
}

/** UPDATE — Modifie un élément (PATCH partiel : seuls les champs fournis changent). */
export function modifier<T = ElementGlpi>(
  endpoint: string,
  id: number,
  donnees: object,
): Promise<T> {
  return update<T, object>(endpoint, id, donnees)
}

/**
 * UPDATE — Modifie UN SEUL champ d'un élément.
 * Pour un champ relation (status, location…) passer la valeur en objet { id }.
 *   modifierUnChamp('/Assets/Computer', 12, 'name', 'NOUVEAU')
 *   modifierUnChamp('/Assets/Computer', 12, 'status', { id: 3 })
 */
export function modifierUnChamp<T = ElementGlpi>(
  endpoint: string,
  id: number,
  champ: string,
  valeur: unknown,
): Promise<T> {
  return update<T, object>(endpoint, id, { [champ]: valeur })
}

/**
 * DELETE — Met l'élément en CORBEILLE (suppression logique, réversible) via l'API v2.
 * Pour supprimer DÉFINITIVEMENT, utiliser `purger`.
 */
export async function mettreEnCorbeille(endpoint: string, id: number): Promise<void> {
  await remove(endpoint, id)
}

/**
 * DELETE — Supprime DÉFINITIVEMENT un élément (purge via l'API v1).
 * L'API v2 ne purge jamais : on passe donc par v1 force_purge.
 */
export async function purger(endpoint: string, id: number): Promise<void> {
  await v1BulkPurge(classeV1(endpoint), [id])
}

/** DELETE — Purge DÉFINITIVEMENT plusieurs éléments d'un coup (rapide). */
export async function purgerPlusieurs(endpoint: string, ids: number[]): Promise<void> {
  await v1BulkPurge(classeV1(endpoint), ids)
}
