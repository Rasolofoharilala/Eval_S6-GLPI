import axios from 'axios'
import type { ItemTicketLink } from '@/api/glpiV1Client'

// ═════════════════════════════════════════════════════════════════════════════
// SERVICE « NOUVEAUX COÛTS » (table SQLite via backend Spring)
//
// Toutes les opérations possibles sur la table `nouveau_cout` sont ici.
// Endpoints backend : /api/couts
//
//   GET    /api/couts                        → tous les coûts ACTIFS
//   GET    /api/couts/items                  → totaux par item (actifs)
//   GET    /api/couts/ticket/{id}            → tous les coûts d'un ticket
//   GET    /api/couts/ticket/{id}/actifs     → coûts actifs d'un ticket
//   GET    /api/couts/ticket/{id}/dernier    → dernier coût total actif
//   POST   /api/couts                        → créer (réparti sur les items)
//   POST   /api/couts/reouverture            → réouverture (+X%)
//   POST   /api/couts/ticket/{id}/annuler    → annuler les coûts actifs
//   DELETE /api/couts                        → vider toute la table
//   DELETE /api/couts/ticket/{id}            → supprimer les coûts d'un ticket
// ═════════════════════════════════════════════════════════════════════════════

export type CoutCree = {
  id: number
  ticketId: number
  itemId: number
  itemType: string
  cout: number
  annule: boolean
}

export type CoutParItem = {
  itemId: number
  itemType: string
  cout: number
}

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8080'
const URL = `${backendUrl}/api/couts`

// Transforme des liens Item_Ticket (API v1) en items pour le backend.
function versItems(items: ItemTicketLink[]) {
  return items.map((item) => ({ itemId: item.items_id, itemType: item.itemtype }))
}

// ─── CREATE ─────────────────────────────────────────────────────────────────

/** Crée un nouveau coût pour un ticket, réparti sur ses items. */
export async function enregistrerNouveauCout(
  ticketId: number,
  nouveauCout: number,
  items: ItemTicketLink[],
): Promise<CoutCree[]> {
  const response = await axios.post<CoutCree[]>(URL, {
    ticketId,
    nouveauCout,
    items: versItems(items),
  })
  return response.data
}

/**
 * RÉOUVERTURE (Terminé → In progress) : majore la dernière valeur du ticket de
 * `pourcentage` % (ex : 10 → +10%), annule l'ancien coût et réinsère le nouveau.
 */
export async function reouvrirTicket(
  ticketId: number,
  pourcentage: number,
  items: ItemTicketLink[],
): Promise<CoutCree[]> {
  const response = await axios.post<CoutCree[]>(`${URL}/reouverture`, {
    ticketId,
    pourcentage,
    items: versItems(items),
  })
  return response.data
}

// ─── READ ───────────────────────────────────────────────────────────────────

/** Tous les coûts ACTIFS (annulés exclus). */
export async function getTousLesCouts(): Promise<CoutCree[]> {
  const response = await axios.get<CoutCree[]>(URL)
  return response.data
}

/** Totaux par item (actifs) — utilisé par /coutsParc. */
export async function getCoutsParItem(): Promise<CoutParItem[]> {
  const response = await axios.get<CoutParItem[]>(`${URL}/items`)
  return response.data
}

/** Tous les coûts d'un ticket (annulés inclus). */
export async function getCoutsDuTicket(ticketId: number): Promise<CoutCree[]> {
  const response = await axios.get<CoutCree[]>(`${URL}/ticket/${ticketId}`)
  return response.data
}

/** Coûts ACTIFS d'un ticket. */
export async function getCoutsActifsDuTicket(ticketId: number): Promise<CoutCree[]> {
  const response = await axios.get<CoutCree[]>(`${URL}/ticket/${ticketId}/actifs`)
  return response.data
}

/** Dernier coût total actif d'un ticket (base du calcul de réouverture). */
export async function getDernierCout(ticketId: number): Promise<number> {
  const response = await axios.get<{ dernierCout: number }>(`${URL}/ticket/${ticketId}/dernier`)
  return Number(response.data.dernierCout) || 0
}

// ─── DELETE / ANNULATION ─────────────────────────────────────────────────────

/** Annule (sans réinsérer) les coûts actifs d'un ticket. */
export async function annulerCoutsDuTicket(ticketId: number): Promise<void> {
  await axios.post(`${URL}/ticket/${ticketId}/annuler`)
}

/** Supprime physiquement les coûts d'un ticket. */
export async function supprimerCoutsDuTicket(ticketId: number): Promise<void> {
  await axios.delete(`${URL}/ticket/${ticketId}`)
}

/** Vide toute la table des nouveaux coûts (appelé à la réinitialisation). */
export async function supprimerTousLesCouts(): Promise<void> {
  await axios.delete(URL)
}
