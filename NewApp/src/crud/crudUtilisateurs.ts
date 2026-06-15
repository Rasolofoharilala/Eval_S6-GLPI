// ═════════════════════════════════════════════════════════════════════════════
// CRUD UTILISATEURS — opérations sur les comptes GLPI.
//
// ⚠ Les comptes par défaut (id ≤ 6 : glpi, post-only, tech…) sont PROTÉGÉS :
//    on refuse de les supprimer (cohérent avec le reset).
// ═════════════════════════════════════════════════════════════════════════════

import {
  listerActifs,
  parId,
  creer,
  modifier,
  modifierUnChamp,
  mettreEnCorbeille,
  purger,
  type ElementGlpi,
} from './crudGenerique'

const ENDPOINT = '/Administration/User'
const ID_PROTEGE_MAX = 6 // comptes système : jamais supprimés

export type Utilisateur = ElementGlpi & {
  username?: string
  firstname?: string
  realname?: string
  is_active?: boolean
}

// Champs modifiables d'un utilisateur.
export type ChampsUtilisateur = {
  username?: string
  firstname?: string
  realname?: string
  password?: string
  is_active?: boolean
}

// ─── READ ───────────────────────────────────────────────────────────────────

export function listerUtilisateurs(): Promise<Utilisateur[]> {
  return listerActifs<Utilisateur>(ENDPOINT)
}

export function utilisateurParId(id: number): Promise<Utilisateur> {
  return parId<Utilisateur>(ENDPOINT, id)
}

// ─── CREATE ─────────────────────────────────────────────────────────────────

/** Crée un utilisateur (username obligatoire côté GLPI). */
export function creerUtilisateur(champs: ChampsUtilisateur): Promise<Utilisateur> {
  return creer<Utilisateur>(ENDPOINT, champs)
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export function modifierUtilisateur(id: number, champs: ChampsUtilisateur): Promise<Utilisateur> {
  return modifier<Utilisateur>(ENDPOINT, id, champs)
}

/** Active ou désactive un compte. */
export function changerActivation(id: number, actif: boolean): Promise<Utilisateur> {
  return modifierUnChamp<Utilisateur>(ENDPOINT, id, 'is_active', actif)
}

// ─── DELETE (avec protection des comptes système) ────────────────────────────

function verifierNonProtege(id: number) {
  if (id <= ID_PROTEGE_MAX) {
    throw new Error(`Utilisateur id=${id} protégé (compte système, id ≤ ${ID_PROTEGE_MAX}).`)
  }
}

/** Met un utilisateur en corbeille (refuse les comptes système). */
export function supprimerUtilisateur(id: number): Promise<void> {
  verifierNonProtege(id)
  return mettreEnCorbeille(ENDPOINT, id)
}

/** Supprime DÉFINITIVEMENT un utilisateur (refuse les comptes système). */
export function purgerUtilisateur(id: number): Promise<void> {
  verifierNonProtege(id)
  return purger(ENDPOINT, id)
}
