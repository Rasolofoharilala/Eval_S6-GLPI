import type { ItemTicketLink } from '@/services/api/glpiV1Client'
import * as localDb from '@/services/sqlite/localDb'
import type {
  CoutCree,
  CoutParItem,
  ItemLie,
  Reouverture,
  Supercost,
} from '@/services/sqlite/localDb'

// ═════════════════════════════════════════════════════════════════════════════
// SERVICE « NOUVEAUX COÛTS » (table SQLite locale via @/services/sqlite/localDb)
//
// Toutes les opérations sur la table `nouveau_cout` sont déléguées au module
// SQLite local (sql.js + IndexedDB). Il n'y a plus de backend Spring Boot.
//
//   getTousLesCouts()                 → tous les coûts ACTIFS
//   getCoutsParItem()                 → totaux par item (actifs)
//   getCoutsDuTicket(id)              → tous les coûts d'un ticket
//   getCoutsActifsDuTicket(id)        → coûts actifs d'un ticket
//   getDernierCout(id)                → dernier coût total actif
//   enregistrerNouveauCout(...)       → créer (réparti sur les items)
//   reouvrirTicket(...)               → réouverture (+X%)
//   annulerCoutsDuTicket(id)          → annuler les coûts actifs
//   supprimerTousLesCouts()           → vider toute la table
//   supprimerCoutsDuTicket(id)        → supprimer les coûts d'un ticket
// ═════════════════════════════════════════════════════════════════════════════

export type { CoutCree, CoutParItem, Reouverture, Supercost }

// Transforme des liens Item_Ticket (API v1) en items pour la base locale.
function versItems(items: ItemTicketLink[]): ItemLie[] {
  return items.map((item) => ({ itemId: item.items_id, itemType: item.itemtype }))
}

// ─── CREATE ─────────────────────────────────────────────────────────────────

/** Crée un nouveau coût pour un ticket, réparti sur ses items. */
export function enregistrerNouveauCout(
  ticketId: number,
  nouveauCout: number,
  items: ItemTicketLink[],
): Promise<CoutCree[]> {
  return localDb.creerCout(ticketId, nouveauCout, versItems(items))
}

/**
 * RÉOUVERTURE (Terminé → In progress) : majore la dernière valeur du ticket de
 * `pourcentage` % (ex : 10 → +10%), annule l'ancien coût et réinsère le nouveau.
 */
export function reouvrirTicket(
  ticketId: number,
  pourcentage: number,
  items: ItemTicketLink[],
  mode: number = 1,
): Promise<CoutCree[]> {
  return localDb.reouvrir(ticketId, pourcentage, versItems(items), mode)
}

/** Coût de base selon le mode choisi (1=dernier, 2=premier, 3=moyenne, 4=total). */
export function getCoutSelonMode(ticketId: number, mode: number): Promise<number> {
  return localDb.coutSelonMode(ticketId, mode)
}

// ─── LISTE DES RÉOUVERTURES (Alea 1 & 2) ──────────────────────────────────────

/** Toutes les réouvertures faites (une par lot). */
export function getReouvertures(): Promise<Reouverture[]> {
  return localDb.findAllReouverture()
}

/** Modifie une réouverture (nouveau % et/ou mode) puis recalcule sa valeur. */
export function modifierReouverture(
  ticketId: number,
  lot: number,
  pourcentage: number,
  mode: number,
): Promise<void> {
  return localDb.updateReouverture(ticketId, lot, pourcentage, mode)
}

/** Supprime une réouverture. */
export function supprimerReouverture(ticketId: number, lot: number): Promise<void> {
  return localDb.deleteReouverture(ticketId, lot)
}

// ─── ANNULATIONS DE RÉOUVERTURE (Alea 1) ──────────────────────────────────────

/** Annule le dernier coût de réouverture appliqué. */
export function annulerDerniereReouverture(): Promise<void> {
  return localDb.annulerDerniereReouverture()
}

/** Liste des réouvertures annulées. */
export function getAnnulations(): Promise<Reouverture[]> {
  return localDb.findAnnulations()
}

/** Rétablit un coût annulé (réouverture ou supercost) à sa position d'origine. */
export function retablirReouverture(ticketId: number, lot: number): Promise<void> {
  return localDb.retablirLot(ticketId, lot)
}

// ─── PLAFOND DE RÉOUVERTURE (Alea 2) ──────────────────────────────────────────

/** Lit le plafond de réouverture (en %). */
export function getPlafond(): Promise<number> {
  return localDb.getPlafond()
}

/** Enregistre le plafond de réouverture (en %) puis recalcule les réouvertures. */
export async function setPlafond(valeur: number): Promise<void> {
  await localDb.setPlafond(valeur)
  await localDb.recalculerToutesReouvertures()
}

// ─── LISTE DES OUVERTURES / SUPERCOST (Alea 2) ────────────────────────────────

/** Toutes les ouvertures faites (une par lot). */
export function getSupercosts(): Promise<Supercost[]> {
  return localDb.findAllSupercost()
}

/** Modifie la valeur d'une ouverture (répartie sur ses items). */
export function modifierSupercost(ticketId: number, lot: number, valeur: number): Promise<void> {
  return localDb.updateSupercost(ticketId, lot, valeur)
}

/** Supprime une ouverture. */
export function supprimerSupercost(ticketId: number, lot: number): Promise<void> {
  return localDb.deleteSupercost(ticketId, lot)
}

// ─── READ ───────────────────────────────────────────────────────────────────

/** Tous les coûts ACTIFS (annulés exclus). */
export function getTousLesCouts(): Promise<CoutCree[]> {
  return localDb.getAllCouts()
}

/** Totaux par item (actifs) — utilisé par /coutsParc. */
export function getCoutsParItem(): Promise<CoutParItem[]> {
  return localDb.getCoutsParItem()
}

/** Tous les coûts d'un ticket (annulés inclus). */
export function getCoutsDuTicket(ticketId: number): Promise<CoutCree[]> {
  return localDb.getByTicketId(ticketId)
}

/** Coûts ACTIFS d'un ticket. */
export function getCoutsActifsDuTicket(ticketId: number): Promise<CoutCree[]> {
  return localDb.getActifsByTicketId(ticketId)
}

// id Ticket a recuperer dans le kanban
/** Dernier coût total actif d'un ticket (base du calcul de réouverture). */
export function getDernierCout(ticketId: number): Promise<number> {
  return localDb.dernierCoutTotalActif(ticketId)
}

// ─── DELETE / ANNULATION ─────────────────────────────────────────────────────

/**
 * Annule le dernier coût d'un ticket (« Annuler le dernier coût » du Kanban) :
 * seul le dernier lot actif est marqué annulé, il apparaît alors dans la liste
 * des annulations et reste rétablissable. L'historique antérieur est conservé.
 */
export function annulerCoutsDuTicket(ticketId: number): Promise<void> {
  return localDb.annulerDernierLot(ticketId)
}

/** Supprime physiquement les coûts d'un ticket. */
export function supprimerCoutsDuTicket(ticketId: number): Promise<void> {
  return localDb.supprimerByTicketId(ticketId)
}

/** Vide toute la table des nouveaux coûts (appelé à la réinitialisation). */
export function supprimerTousLesCouts(): Promise<void> {
  return localDb.supprimerTousLesCouts()
}
