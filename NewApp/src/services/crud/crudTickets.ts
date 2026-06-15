// ═════════════════════════════════════════════════════════════════════════════
// CRUD TICKETS — toutes les opérations sur les tickets, prêtes à l'emploi
//
// « On me dit de modifier juste le statut / la priorité / le titre d'un ticket »
//   → il y a UNE fonction pour chaque cas, pas besoin de réfléchir au payload.
//
// Import : import * as Tickets from '@/services/crud/crudTickets'  (ou via '@/crud')
// ═════════════════════════════════════════════════════════════════════════════

import { httpClient } from '@/services/api/httpClient'
import { getTickets, getTicketById } from '@/services/generated/ticketService'
import type { Ticket } from '@/services/generated/ticketService'
import {
  creerTicketComplet,
  changerStatutTicket,
  type DonneesTicket,
  type ElementLie,
} from '@/services/ticketActions'
import { v1LinkItemToTicket, v1GetTicketItems } from '@/services/api/glpiV1Client'
import { modifierUnChamp, parId } from './crudGenerique'

const ENDPOINT = '/Assistance/Ticket'

// ─── READ ───────────────────────────────────────────────────────────────────

/** Tous les tickets (via API v1, pagination correcte au-delà de 100). */
export function listerTickets(): Promise<Ticket[]> {
  return getTickets()
}

/** Un ticket complet par id (catégorie, lieu, équipe… inclus). */
export function ticketParId(id: number): Promise<Ticket> {
  return getTicketById(id)
}

// ─── CREATE ─────────────────────────────────────────────────────────────────

/** Crée un ticket complet (ticket + acteurs + éléments + durée). Renvoie l'id. */
export function creerTicket(donnees: DonneesTicket): Promise<number> {
  return creerTicketComplet(donnees)
}

/** Création minimale : juste un titre (+ statut optionnel, défaut Nouveau). */
export function creerTicketSimple(titre: string, statutId = 1): Promise<number> {
  return creerTicketComplet({ name: titre, content: '', type: 1, statutId })
}

// ─── UPDATE : champ par champ (le plus utile en éval) ─────────────────────────

/** Change SEULEMENT le statut (1=Nouveau, 2=En cours, 5=Résolu, 6=Clos…). */
export function changerStatut(id: number, statutId: number, note?: string): Promise<void> {
  return changerStatutTicket(id, statutId, note)
}

/** Change la priorité (1=Très basse … 6=Majeure). */
export function changerPriorite(id: number, priorite: number): Promise<Ticket> {
  return modifierUnChamp<Ticket>(ENDPOINT, id, 'priority', priorite)
}

/** Change l'urgence (1..5). */
export function changerUrgence(id: number, urgence: number): Promise<Ticket> {
  return modifierUnChamp<Ticket>(ENDPOINT, id, 'urgency', urgence)
}

/** Change l'impact (1..5). */
export function changerImpact(id: number, impact: number): Promise<Ticket> {
  return modifierUnChamp<Ticket>(ENDPOINT, id, 'impact', impact)
}

/** Change le titre. */
export function changerTitre(id: number, titre: string): Promise<Ticket> {
  return modifierUnChamp<Ticket>(ENDPOINT, id, 'name', titre)
}

/** Change la description. */
export function changerDescription(id: number, description: string): Promise<Ticket> {
  return modifierUnChamp<Ticket>(ENDPOINT, id, 'content', description)
}

/** Change le type (1=Incident, 2=Demande). */
export function changerType(id: number, type: 1 | 2): Promise<Ticket> {
  return modifierUnChamp<Ticket>(ENDPOINT, id, 'type', type)
}

/** Change la catégorie (id de la catégorie ITIL). */
export function changerCategorie(id: number, categorieId: number): Promise<Ticket> {
  return modifierUnChamp<Ticket>(ENDPOINT, id, 'category', { id: categorieId })
}

/** Change le lieu (id du lieu). */
export function changerLieu(id: number, lieuId: number): Promise<Ticket> {
  return modifierUnChamp<Ticket>(ENDPOINT, id, 'location', { id: lieuId })
}

/** Modifie plusieurs champs d'un coup (PATCH partiel libre). */
export function modifierTicket(id: number, champs: object): Promise<Ticket> {
  return httpClient.patch<Ticket>(`${ENDPOINT}/${id}`, champs).then((r) => r.data)
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

/** Met le ticket en corbeille (réversible). */
export async function supprimerTicket(id: number): Promise<void> {
  await httpClient.delete(`${ENDPOINT}/${id}`)
}

/** Supprime DÉFINITIVEMENT le ticket (purge via v1). */
export async function purgerTicket(id: number): Promise<void> {
  await httpClient.delete(`${ENDPOINT}/${id}`, { params: { force_purge: true } })
}

// ─── ÉLÉMENTS LIÉS (onglet « Éléments » du ticket) ───────────────────────────

/** Liste les éléments (assets) associés à un ticket. */
export function listerElementsLies(ticketId: number) {
  return v1GetTicketItems(ticketId)
}

/** Associe UN élément au ticket (ex : itemtype='Computer', itemId=12). */
export function associerElement(ticketId: number, itemtype: string, itemId: number) {
  return v1LinkItemToTicket(ticketId, itemId, itemtype)
}

/** Associe PLUSIEURS éléments au ticket. */
export async function associerElements(ticketId: number, elements: ElementLie[]): Promise<void> {
  for (const el of elements) {
    await v1LinkItemToTicket(ticketId, el.id, el.itemtype)
  }
}

// ─── SUIVI / TÂCHES / COÛTS (timeline du ticket) ─────────────────────────────

/** Ajoute une note de suivi (followup) au ticket. */
export async function ajouterSuivi(ticketId: number, contenu: string): Promise<void> {
  await httpClient.post(`${ENDPOINT}/${ticketId}/Timeline/Followup`, {
    content: contenu,
    is_private: false,
  })
}

/** Ajoute une tâche au ticket (avec durée en minutes). */
export async function ajouterTache(
  ticketId: number,
  contenu: string,
  dureeMinutes = 0,
): Promise<void> {
  await httpClient.post(`${ENDPOINT}/${ticketId}/Timeline/Task`, {
    content: contenu,
    duration: dureeMinutes * 60,
  })
}

/** Liste les coûts d'un ticket. */
export async function listerCouts(ticketId: number) {
  const res = await httpClient.get(`${ENDPOINT}/${ticketId}/Cost`)
  return Array.isArray(res.data) ? res.data : []
}

/** Ajoute un coût au ticket (temps + fixe, durée en secondes). */
export async function ajouterCout(
  ticketId: number,
  coutTemps: number,
  coutFixe: number,
  dureeSecondes = 0,
): Promise<void> {
  await httpClient.post(`${ENDPOINT}/${ticketId}/Cost`, {
    name: 'Coût',
    cost_time: coutTemps,
    cost_fixed: coutFixe,
    duration: dureeSecondes,
  })
}

// Petit utilitaire pratique : récupérer un ticket via le CRUD générique aussi.
export const ticketBrutParId = (id: number) => parId<Ticket>(ENDPOINT, id)
