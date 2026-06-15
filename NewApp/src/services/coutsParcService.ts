import type { GroupeParc } from '@/composables/useParcAssets'
import { getTickets, type Ticket } from '@/services/generated/ticketService'
import { getTousLesCouts } from '@/services/nouveauCoutService'
import { httpClient } from '@/api/httpClient'

// ═════════════════════════════════════════════════════════════════════════════
// COÛTS PAR ITEM
//
// Au passage d'un ticket en « Terminé » (Kanban), un « nouveau prix » est saisi
// et stocké dans la table « nouveau prix item » (backend Spring). Si le ticket
// a plusieurs items liés, le backend a DÉJÀ divisé ce prix par le nombre d'items
// (ex : 150 sur 2 items → 75 par item).
//
// Pour chaque (ticket × item lié), on affiche :
//   - Coût fixe / item    = somme des Fixed_Cost du ticket, SUR LE 1ER ITEM SEULEMENT
//   - Coût horaire / item = somme des Time_Cost du ticket, SUR LE 1ER ITEM SEULEMENT
//   - Nouveau prix / item = prix DÉJÀ divisé par le backend
//   - Total / item        = coût fixe + coût horaire + nouveau prix
//   - Total sans horaire  = coût fixe + nouveau prix (Total − horaire)
//
// RÈGLE : le coût GLPI du ticket (fixe + horaire) n'est compté qu'UNE fois,
// sur la PREMIÈRE ligne d'item du ticket. Les autres lignes du même ticket
// n'affichent que leur nouveau prix. Ainsi le total général ne double-compte pas.
//
// IMPORTANT : les coûts GLPI ne sont PAS dans `ticket.costs` (vide via l'API
// v1). On les récupère par ticket : GET /Assistance/Ticket/{id}/Cost.
// ═════════════════════════════════════════════════════════════════════════════

export type LigneCoutParc = {
  allocationId: number
  ticketId: number
  ticketNom: string
  itemId: number
  itemType: string
  typeCle: string
  nomItem: string
  nbItemsLies: number
  coutFixeParItem: number
  coutHoraireParItem: number
  nouveauPrixParItem: number
  totalParItem: number
  totalSansHoraireParItem: number
}

type LigneCoutGlpi = {
  cost_time?: number | string
  cost_fixed?: number | string
  cost_material?: number | string
}

// Convertit "8,7" ou 8.7 en nombre (gère la virgule décimale française).
function nombre(valeur: number | string | undefined): number {
  if (typeof valeur === 'number') return valeur
  if (typeof valeur === 'string') return Number(valeur.replace(',', '.')) || 0
  return 0
}

// Récupère et additionne les coûts GLPI d'un ticket (appel dédié).
async function coutsGlpiDuTicket(ticketId: number): Promise<{ fixe: number; horaire: number }> {
  try {
    const res = await httpClient.get<LigneCoutGlpi[]>(`/Assistance/Ticket/${ticketId}/Cost`)
    const lignes = Array.isArray(res.data) ? res.data : []
    let fixe = 0
    let horaire = 0
    for (const ligne of lignes) {
      fixe += nombre(ligne.cost_fixed) + nombre(ligne.cost_material)
      horaire += nombre(ligne.cost_time) // somme brute, PAS × la durée
    }
    return { fixe, horaire }
  } catch {
    return { fixe: 0, horaire: 0 }
  }
}

export async function construireCoutsParc(groupes: GroupeParc[]): Promise<LigneCoutParc[]> {
  const [allocations, tickets] = await Promise.all([getTousLesCouts(), getTickets()])

  // Index des assets : "computer:176" → { typeCle, nomItem }
  const assets = new Map<string, { typeCle: string; nomItem: string }>()
  for (const groupe of groupes) {
    for (const element of groupe.elements) {
      if (!element.id) continue
      assets.set(`${groupe.itemtype.toLowerCase()}:${element.id}`, {
        typeCle: groupe.cle,
        nomItem: element.name?.trim() || '(sans nom)',
      })
    }
  }

  const ticketsParId = new Map<number, Ticket>(
    tickets.filter((t) => t.id !== undefined).map((t) => [t.id as number, t]),
  )

  // On ignore les coûts dont le ticket n'existe plus dans GLPI (ex : ancien
  // coût en SQLite après une réinitialisation). Évite des appels voués au 404.
  const allocationsValides = allocations.filter((a) => ticketsParId.has(a.ticketId))

  // Nombre d'items liés par ticket (colonne informative « Nb items liés »).
  const nombreItemsParTicket = new Map<number, number>()
  for (const allocation of allocationsValides) {
    nombreItemsParTicket.set(
      allocation.ticketId,
      (nombreItemsParTicket.get(allocation.ticketId) ?? 0) + 1,
    )
  }

  // Les coûts GLPI ne dépendent que du ticket : on les récupère UNE fois par
  // ticket distinct (pas une fois par allocation).
  const ticketIds = [...new Set(allocationsValides.map((a) => a.ticketId))]
  const coutsGlpiParTicket = new Map<number, { fixe: number; horaire: number }>()
  for (const id of ticketIds) {
    coutsGlpiParTicket.set(id, await coutsGlpiDuTicket(id))
  }

  // Mémorise les tickets dont le coût GLPI a déjà été attribué (1 seule fois).
  const coutGlpiDejaAttribue = new Set<number>()

  return allocationsValides
    .map((allocation) => {
      const ticket = ticketsParId.get(allocation.ticketId)
      const nbItemsLies = nombreItemsParTicket.get(allocation.ticketId) ?? 1
      const coutsGlpi = coutsGlpiParTicket.get(allocation.ticketId) ?? { fixe: 0, horaire: 0 }

      // Le coût GLPI du ticket n'est porté que par sa PREMIÈRE ligne d'item.
      const premiereLigne = !coutGlpiDejaAttribue.has(allocation.ticketId)
      if (premiereLigne) coutGlpiDejaAttribue.add(allocation.ticketId)
      const coutFixeParItem = premiereLigne ? coutsGlpi.fixe : 0
      const coutHoraireParItem = premiereLigne ? coutsGlpi.horaire : 0

      // Le nouveau prix est DÉJÀ divisé par le backend (par nb d'items liés).
      const nouveauPrixParItem = Number(allocation.cout) || 0
      const asset = assets.get(`${allocation.itemType.toLowerCase()}:${allocation.itemId}`)

      const totalParItem = coutFixeParItem + coutHoraireParItem + nouveauPrixParItem

      return {
        allocationId: allocation.id,
        ticketId: allocation.ticketId,
        ticketNom: ticket?.name?.trim() || `Ticket #${allocation.ticketId}`,
        itemId: allocation.itemId,
        itemType: allocation.itemType,
        typeCle: asset?.typeCle ?? allocation.itemType.toLowerCase(),
        nomItem: asset?.nomItem ?? '(item introuvable)',
        nbItemsLies,
        coutFixeParItem,
        coutHoraireParItem,
        nouveauPrixParItem,
        totalParItem,
        totalSansHoraireParItem: coutFixeParItem + nouveauPrixParItem,
      }
    })
    .sort((a, b) => b.ticketId - a.ticketId || a.itemType.localeCompare(b.itemType))
}
