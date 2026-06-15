// ═════════════════════════════════════════════════════════════════════════════
// CRUD PARC — opérations sur les équipements (Computer, Monitor, Printer,
// Peripheral, Phone, NetworkEquipment).
//
// On passe le TYPE en clé (ex : 'computer') ; l'endpoint est résolu via
// config/parc.ts. Ajouter un type dans config/parc.ts le rend dispo ici.
//
// « Modifier juste le statut / le lieu / l'utilisateur d'un équipement »
//   → une fonction dédiée pour chaque champ.
// ═════════════════════════════════════════════════════════════════════════════

import { trouverTypeParc, TYPES_PARC } from '@/config/parc'
import {
  listerActifs,
  lister,
  parId,
  creer,
  modifier,
  modifierUnChamp,
  mettreEnCorbeille,
  purger,
  type ElementGlpi,
} from './crudGenerique'

// Un asset du parc (champs communs renvoyés par l'API v2).
export type AssetParc = ElementGlpi & {
  otherserial?: string | null
  serial?: string | null
  status?: { id?: number; name?: string | null } | null
  location?: { id?: number; name?: string | null } | null
  user?: { id?: number; name?: string | null } | null
  manufacturer?: { id?: number; name?: string | null } | null
  model?: { id?: number; name?: string | null } | null
}

// Résout l'endpoint v2 d'un type (ex : 'computer' → '/Assets/Computer').
// Lève une erreur claire si le type n'existe pas dans config/parc.ts.
function endpointDe(typeCle: string): string {
  const type = trouverTypeParc(typeCle)
  if (!type) {
    throw new Error(`Type d'équipement inconnu : « ${typeCle} ». Voir config/parc.ts.`)
  }
  return type.endpoint
}

// ─── READ ───────────────────────────────────────────────────────────────────

/** Liste les équipements actifs d'un type (ex : listerAssets('computer')). */
export function listerAssets(typeCle: string): Promise<AssetParc[]> {
  return listerActifs<AssetParc>(endpointDe(typeCle))
}

/** Liste les équipements d'un type, corbeille incluse. */
export function listerAssetsAvecCorbeille(typeCle: string): Promise<AssetParc[]> {
  return lister<AssetParc>(endpointDe(typeCle))
}

/** Un équipement par id. */
export function assetParId(typeCle: string, id: number): Promise<AssetParc> {
  return parId<AssetParc>(endpointDe(typeCle), id)
}

/** Liste TOUS les équipements de TOUS les types, à plat. */
export async function listerToutLeParc(): Promise<Array<AssetParc & { typeCle: string }>> {
  const tout: Array<AssetParc & { typeCle: string }> = []
  for (const type of TYPES_PARC) {
    const assets = await listerActifs<AssetParc>(type.endpoint)
    for (const a of assets) tout.push({ ...a, typeCle: type.cle })
  }
  return tout
}

// ─── CREATE ─────────────────────────────────────────────────────────────────

// Champs acceptés à la création/modification d'un équipement.
export type ChampsAsset = {
  name?: string
  otherserial?: string // numéro d'inventaire
  statusId?: number
  locationId?: number
  userId?: number
  manufacturerId?: number
  modelId?: number
}

function versPayload(champs: ChampsAsset): object {
  const payload: Record<string, unknown> = {}
  if (champs.name !== undefined) payload.name = champs.name
  if (champs.otherserial !== undefined) payload.otherserial = champs.otherserial
  if (champs.statusId) payload.status = { id: champs.statusId }
  if (champs.locationId) payload.location = { id: champs.locationId }
  if (champs.userId) payload.user = { id: champs.userId }
  if (champs.manufacturerId) payload.manufacturer = { id: champs.manufacturerId }
  if (champs.modelId) payload.model = { id: champs.modelId }
  return payload
}

/** Crée un équipement. Ex : creerAsset('computer', { name:'PC-1', statusId:3 }). */
export function creerAsset(typeCle: string, champs: ChampsAsset): Promise<AssetParc> {
  return creer<AssetParc>(endpointDe(typeCle), versPayload(champs))
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

/** Modifie plusieurs champs d'un équipement. */
export function modifierAsset(
  typeCle: string,
  id: number,
  champs: ChampsAsset,
): Promise<AssetParc> {
  return modifier<AssetParc>(endpointDe(typeCle), id, versPayload(champs))
}

/** Renomme un équipement. */
export function changerNom(typeCle: string, id: number, nom: string): Promise<AssetParc> {
  return modifierUnChamp<AssetParc>(endpointDe(typeCle), id, 'name', nom)
}

/** Change le statut (id d'un statut, ex : « En stock »). */
export function changerStatut(typeCle: string, id: number, statutId: number): Promise<AssetParc> {
  return modifierUnChamp<AssetParc>(endpointDe(typeCle), id, 'status', { id: statutId })
}

/** Change le lieu (id d'un lieu). */
export function changerLieu(typeCle: string, id: number, lieuId: number): Promise<AssetParc> {
  return modifierUnChamp<AssetParc>(endpointDe(typeCle), id, 'location', { id: lieuId })
}

/** Change l'utilisateur affecté (id d'un utilisateur). */
export function changerUtilisateur(
  typeCle: string,
  id: number,
  userId: number,
): Promise<AssetParc> {
  return modifierUnChamp<AssetParc>(endpointDe(typeCle), id, 'user', { id: userId })
}

/** Change le fabricant (id). */
export function changerFabricant(
  typeCle: string,
  id: number,
  fabricantId: number,
): Promise<AssetParc> {
  return modifierUnChamp<AssetParc>(endpointDe(typeCle), id, 'manufacturer', { id: fabricantId })
}

/** Change le modèle (id). */
export function changerModele(typeCle: string, id: number, modeleId: number): Promise<AssetParc> {
  return modifierUnChamp<AssetParc>(endpointDe(typeCle), id, 'model', { id: modeleId })
}

/** Change le numéro d'inventaire. */
export function changerNumeroInventaire(
  typeCle: string,
  id: number,
  numero: string,
): Promise<AssetParc> {
  return modifierUnChamp<AssetParc>(endpointDe(typeCle), id, 'otherserial', numero)
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

/** Met un équipement en corbeille (réversible). */
export function supprimerAsset(typeCle: string, id: number): Promise<void> {
  return mettreEnCorbeille(endpointDe(typeCle), id)
}

/** Supprime DÉFINITIVEMENT un équipement (purge via v1). */
export function purgerAsset(typeCle: string, id: number): Promise<void> {
  return purger(endpointDe(typeCle), id)
}
