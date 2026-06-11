import { httpClient } from '@/api/httpClient'
import { v1GetTicketItems } from '@/api/glpiV1Client'
import type { Ticket } from '@/services/generated/ticketService'

// Agrégats du dashboard Tickets nécessitant des requêtes complémentaires :
// - les coûts détaillés (l'API liste seulement `costs: [{id}]`, sans montants)
// - le nombre total d'éléments liés aux tickets (onglet « Éléments »)

export type CostAggregate = {
  entries: number // nombre total de lignes de coût
  uniqueTickets: number // nombre de tickets ayant au moins un coût
  totalTimeCost: number
  totalFixedCost: number
  totalOverall: number
}

export type TicketCostLine = {
  id?: number
  cost_time?: number
  cost_fixed?: number
  duration?: number
}

// Exécute des tâches asynchrones par lots pour éviter de saturer le serveur
// (500 tickets → 500 requêtes lancées d'un coup le mettraient à genoux).
async function inBatches<T, R>(
  items: T[],
  size: number,
  task: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size)
    const settled = await Promise.all(batch.map(task))
    results.push(...settled)
  }
  return results
}

/**
 * Récupère et agrège les coûts de tous les tickets fournis.
 *
 * On interroge l'endpoint Cost de CHAQUE ticket : les tickets viennent de
 * l'API v1 (pour contourner le plafond de 100 de l'API v2) et n'incluent donc
 * pas de tableau `costs` permettant de pré-filtrer. Les tickets sans coût
 * renvoient simplement une liste vide.
 */
export async function aggregateTicketCosts(tickets: Ticket[]): Promise<CostAggregate> {
  const avecId = tickets.filter((t) => typeof t.id === 'number')

  const perTicket = await inBatches(avecId, 10, async (t) => {
    try {
      const res = await httpClient.get<TicketCostLine[]>(`/Assistance/Ticket/${t.id}/Cost`)
      return Array.isArray(res.data) ? res.data : []
    } catch {
      return [] as TicketCostLine[]
    }
  })

  let entries = 0
  let uniqueTickets = 0
  let totalTimeCost = 0
  let totalFixedCost = 0

  for (const lines of perTicket) {
    if (lines.length > 0) uniqueTickets++
    for (const line of lines) {
      entries++
      totalTimeCost += Number(line.cost_time) || 0
      totalFixedCost += Number(line.cost_fixed) || 0
    }
  }

  return {
    entries,
    uniqueTickets,
    totalTimeCost,
    totalFixedCost,
    totalOverall: totalTimeCost + totalFixedCost,
  }
}

/**
 * Compte le nombre total d'éléments (assets) liés à l'ensemble des tickets,
 * via l'API v1. GLPI retourne une erreur (400/404) pour les tickets sans élément :
 * on l'ignore et on compte 0 pour ces tickets.
 * Seuls les tickets ayant des coûts (proxy rapide pour "ticket non vide") sont interrogés
 * en priorité ; tous les autres sont inclus aussi pour avoir le total réel.
 */
export async function countLinkedItems(tickets: Ticket[]): Promise<number> {
  const ids = tickets.map((t) => t.id).filter((id): id is number => typeof id === 'number')

  if (ids.length === 0) return 0

  const counts = await inBatches(ids, 10, async (id) => {
    try {
      const items = await v1GetTicketItems(id)
      return Array.isArray(items) ? items.length : 0
    } catch {
      // 404 = ticket sans élément lié, 400 = même raison côté GLPI v1
      return 0
    }
  })

  return counts.reduce((sum, n) => sum + n, 0)
}
