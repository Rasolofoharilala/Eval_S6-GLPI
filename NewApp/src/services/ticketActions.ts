// ═════════════════════════════════════════════════════════════════════════════
// ACTIONS SUR LES TICKETS (centralisées)
//
// Toutes les écritures de ticket passent par ici : ainsi le formulaire de
// création (page dédiée ET dialogue du Kanban) et le drag&drop utilisent
// EXACTEMENT la même logique, avec les particularités GLPI gérées une seule fois.
//
// Particularités GLPI gérées ici :
//   - status doit être un objet { id: N } (et non un entier)
//   - les acteurs (demandeur/observateur/assigné) : POST séparés /TeamMember
//   - les éléments associés : API v1 Item_Ticket (la v2 ne l'expose pas)
//   - la durée totale : une tâche Timeline (actiontime est en lecture seule)
// ═════════════════════════════════════════════════════════════════════════════

import { httpClient } from '@/api/httpClient'
import { createTicket } from '@/services/generated/ticketService'
import { v1LinkItemToTicket } from '@/api/glpiV1Client'

// Un élément (asset) à associer au ticket.
export type ElementLie = {
  id: number
  itemtype: string // classe GLPI : Computer, Monitor, Phone…
}

// Tout ce qu'on peut renseigner à la création d'un ticket.
// Les champs optionnels valant 0 ou '' sont ignorés.
export type DonneesTicket = {
  name: string
  content: string
  type: number // 1=Incident, 2=Demande
  statutId: number
  date?: string // 'AAAA-MM-JJ HH:MM:SS' ou vide
  categoryId?: number
  locationId?: number
  requestTypeId?: number
  urgency?: number
  impact?: number
  priority?: number
  externalId?: string
  entityId?: number
  requesterId?: number
  observerId?: number
  assignedId?: number
  slaTtoId?: number
  slaTtrId?: number
  olaTtoId?: number
  olaTtrId?: number
  dureeMinutes?: number
  elements?: ElementLie[]
}

// { id } si l'id est non nul, sinon undefined (champ ignoré par GLPI).
function relation(id?: number) {
  return id ? { id } : undefined
}

// Ajoute les acteurs au ticket via des POST séparés (l'API ignore "team" au POST).
async function ajouterActeurs(ticketId: number, d: DonneesTicket) {
  const acteurs = [
    { role: 'requester', userId: d.requesterId },
    { role: 'observer', userId: d.observerId },
    { role: 'assigned', userId: d.assignedId },
  ]
  for (const acteur of acteurs) {
    if (!acteur.userId) continue
    try {
      await httpClient.post(`/Assistance/Ticket/${ticketId}/TeamMember`, {
        type: 'User',
        id: acteur.userId,
        role: acteur.role,
      })
    } catch {
      // non-bloquant
    }
  }
}

// Associe les éléments au ticket (API v1). Les échecs sont consignés en followup.
async function associerElements(ticketId: number, elements: ElementLie[]) {
  if (!elements.length) return
  const echecs: ElementLie[] = []
  for (const el of elements) {
    try {
      await v1LinkItemToTicket(ticketId, el.id, el.itemtype)
    } catch {
      echecs.push(el)
    }
  }
  if (echecs.length) {
    const lignes = echecs.map((e) => `- ${e.itemtype} (id=${e.id})`).join('\n')
    try {
      await httpClient.post(`/Assistance/Ticket/${ticketId}/Timeline/Followup`, {
        content: `Éléments à associer :\n${lignes}`,
        is_private: false,
      })
    } catch {
      // non-bloquant
    }
  }
}

// Enregistre la durée totale via une tâche (actiontime est en lecture seule).
async function ajouterDuree(ticketId: number, minutes?: number) {
  if (!minutes) return
  try {
    await httpClient.post(`/Assistance/Ticket/${ticketId}/Timeline/Task`, {
      content: 'Durée totale saisie à la création',
      duration: minutes * 60,
    })
  } catch {
    // non-bloquant
  }
}

/**
 * Crée un ticket complet : ticket + acteurs + éléments + durée.
 * Renvoie l'id du ticket créé.
 */
export async function creerTicketComplet(d: DonneesTicket): Promise<number> {
  const ticket = await createTicket({
    name: d.name.trim(),
    content: d.content.trim(),
    date: d.date || undefined,
    type: (d.type === 2 ? 2 : 1),
    status: relation(d.statutId),
    category: relation(d.categoryId),
    location: relation(d.locationId),
    request_type: relation(d.requestTypeId),
    entity: relation(d.entityId),
    urgency: d.urgency as 1 | 2 | 3 | 4 | 5 | undefined,
    impact: d.impact as 1 | 2 | 3 | 4 | 5 | undefined,
    priority: d.priority as 1 | 2 | 3 | 4 | 5 | undefined,
    external_id: d.externalId?.trim() || undefined,
    sla_tto: relation(d.slaTtoId),
    sla_ttr: relation(d.slaTtrId),
    ola_tto: relation(d.olaTtoId),
    ola_ttr: relation(d.olaTtrId),
  })

  const ticketId = ticket.id
  if (ticketId) {
    await ajouterActeurs(ticketId, d)
    await associerElements(ticketId, d.elements ?? [])
    await ajouterDuree(ticketId, d.dureeMinutes)
  }
  return ticketId ?? 0
}

/**
 * Change le statut d'un ticket (drag&drop Kanban), avec note de suivi optionnelle.
 */
export async function changerStatutTicket(
  ticketId: number,
  statutId: number,
  note?: string,
): Promise<void> {
  await httpClient.patch(`/Assistance/Ticket/${ticketId}`, {
    status: { id: statutId },
  })
  if (note && note.trim()) {
    await httpClient.post(`/Assistance/Ticket/${ticketId}/Timeline/Followup`, {
      content: note.trim(),
      is_private: false,
    })
  }
}
