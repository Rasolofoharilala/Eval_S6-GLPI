// ═════════════════════════════════════════════════════════════════════════════
// CRUD RÉFÉRENCES (dropdowns GLPI) — statuts, lieux, fabricants, modèles,
// catégories, sources de demande…
//
// Les noms d'endpoints sont nommés ici (REFERENCES) : pas besoin de retenir
// les chemins « /Dropdowns/State ». Le find-or-create évite l'erreur 500
// « doit être unique » au réimport.
//
// Ex : await trouverOuCreer('statut', 'En stock')
//      await listerReferences('lieu')
// ═════════════════════════════════════════════════════════════════════════════

import { ensureReferenceByName } from '@/services/import/glpiEnsureService'
import {
  listerActifs,
  parId,
  creer,
  modifierUnChamp,
  mettreEnCorbeille,
  purger,
  type ElementGlpi,
} from './crudGenerique'

// Catalogue des références gérées, avec leur endpoint GLPI.
// ➜ Ajouter une ligne ici suffit pour gérer une nouvelle référence.
export const REFERENCES = {
  statut: '/Dropdowns/State',
  lieu: '/Dropdowns/Location',
  fabricant: '/Dropdowns/Manufacturer',
  categorie: '/Dropdowns/ITILCategory',
  source: '/Dropdowns/RequestType',
  modeleOrdinateur: '/Dropdowns/ComputerModel',
  modeleMoniteur: '/Dropdowns/MonitorModel',
  modeleImprimante: '/Dropdowns/PrinterModel',
  modelePeripherique: '/Dropdowns/PeripheralModel',
  modeleTelephone: '/Dropdowns/PhoneModel',
} as const

export type CleReference = keyof typeof REFERENCES

function endpointDe(cle: CleReference): string {
  return REFERENCES[cle]
}

// ─── READ ───────────────────────────────────────────────────────────────────

/** Liste les valeurs d'une référence (ex : listerReferences('statut')). */
export function listerReferences(cle: CleReference): Promise<ElementGlpi[]> {
  return listerActifs<ElementGlpi>(endpointDe(cle))
}

/** Une valeur de référence par id. */
export function referenceParId(cle: CleReference, id: number): Promise<ElementGlpi> {
  return parId<ElementGlpi>(endpointDe(cle), id)
}

// ─── CREATE / FIND-OR-CREATE ─────────────────────────────────────────────────

/**
 * Trouve une référence par son nom, ou la crée si absente.
 * À UTILISER pour éviter le 500 « doit être unique ». Renvoie l'id (ou null).
 */
export async function trouverOuCreer(cle: CleReference, nom: string): Promise<number | null> {
  const ref = await ensureReferenceByName(endpointDe(cle), nom, true)
  return ref?.id ?? null
}

/** Crée une référence sans vérifier l'existant (échoue si le nom existe déjà). */
export function creerReference(cle: CleReference, nom: string): Promise<ElementGlpi> {
  return creer<ElementGlpi>(endpointDe(cle), { name: nom })
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

/** Renomme une référence. */
export function renommerReference(
  cle: CleReference,
  id: number,
  nouveauNom: string,
): Promise<ElementGlpi> {
  return modifierUnChamp<ElementGlpi>(endpointDe(cle), id, 'name', nouveauNom)
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

/** Met une référence en corbeille. */
export function supprimerReference(cle: CleReference, id: number): Promise<void> {
  return mettreEnCorbeille(endpointDe(cle), id)
}

/** Supprime DÉFINITIVEMENT une référence (purge via v1). */
export function purgerReference(cle: CleReference, id: number): Promise<void> {
  return purger(endpointDe(cle), id)
}
