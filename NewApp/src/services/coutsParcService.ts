import type { GroupeParc } from '@/composables/useParcAssets'
import { getTickets, type Ticket } from '@/services/generated/ticketService'
import { getTousLesCouts } from '@/services/nouveauCoutService'
import { v1GetTicketItems } from '@/services/api/glpiV1Client'
import { httpClient } from '@/services/api/httpClient'

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
//
// SOURCE DES LIGNES : la base est constituée des liens (ticket × item) de GLPI
// (GET /Ticket/{id}/Item_Ticket), PAS de la table SQLite. Ainsi, dès qu'un
// ticket lié à un item est importé, une ligne s'affiche — même si aucun
// « nouveau prix » n'a encore été saisi (SQLite vide → nouveau prix = 0).
// Le nouveau prix SQLite, quand il existe, vient se superposer à ces lignes.
// ═════════════════════════════════════════════════════════════════════════════

// Un coût SQLite brut tel qu'enregistré (pour le détail dépliable).
export type DetailCoutSqlite = {
  id: number
  itemId: number
  itemType: string
  cout: number
  annule: boolean
}

// Un item lié au ticket, avec son nouveau prix SQLite (0 si rien de saisi)
// et le détail de TOUS ses coûts SQLite (actifs + annulés) pour la vue dépliable.
export type ItemCout = {
  itemId: number
  itemType: string
  typeCle: string
  nomItem: string
  nouveauPrixParItem: number
  coutsSqlite: DetailCoutSqlite[]
}

// Une ligne de coût GLPI brute (pour le détail dépliable).
export type DetailCoutGlpi = {
  fixe: number
  materiel: number
  horaire: number
}

// Une LIGNE = un TICKET. Les items sont empilés dans la cellule « Items »,
// et `detail` alimente la sous-ligne dépliable au clic.
export type LigneCoutParc = {
  allocationId: number // = ticketId, sert de :key
  ticketId: number
  ticketNom: string
  nbItemsLies: number
  items: ItemCout[]
  coutFixe: number
  coutHoraire: number
  nouveauPrix: number
  total: number
  totalSansHoraire: number
  detail: {
    coutsGlpi: DetailCoutGlpi[]
  }
}

type LigneCoutGlpi = {
  cost_time?: number | string // TAUX horaire (€/h), à multiplier par la durée
  duration?: number | string // durée en SECONDES (API v2 ; v1 = actiontime)
  actiontime?: number | string // durée en SECONDES (compat API v1)
  cost_fixed?: number | string
  cost_material?: number | string
}

// Convertit "8,7" ou 8.7 en nombre (gère la virgule décimale française).
function nombre(valeur: number | string | undefined): number {
  if (typeof valeur === 'number') return valeur
  if (typeof valeur === 'string') return Number(valeur.replace(',', '.')) || 0
  return 0
}

type CoutsGlpiTicket = { fixe: number; horaire: number; detail: DetailCoutGlpi[] }

// Récupère et additionne les coûts GLPI d'un ticket (appel dédié).
// Renvoie aussi le détail ligne par ligne pour la vue dépliable.
async function coutsGlpiDuTicket(ticketId: number): Promise<CoutsGlpiTicket> {
  try {
    const res = await httpClient.get<LigneCoutGlpi[]>(`/Assistance/Ticket/${ticketId}/Cost`)
    const lignes = Array.isArray(res.data) ? res.data : []
    let fixe = 0
    let horaire = 0
    const detail: DetailCoutGlpi[] = []
    for (const ligne of lignes) {
      const ligneFixe = nombre(ligne.cost_fixed)
      const ligneMateriel = nombre(ligne.cost_material)
      // cost_time est un TAUX horaire (€/h) : le coût réel = taux × durée.
      // La durée est en secondes (v2 : `duration`, v1 : `actiontime`) → /3600
      // pour des heures. Ex : 8,7 €/h × 600 s = 8,7 × (600/3600) = 1,45 €.
      const tauxHoraire = nombre(ligne.cost_time)
      const dureeSecondes = nombre(ligne.duration) || nombre(ligne.actiontime)
      const ligneHoraire = tauxHoraire * (dureeSecondes / 3600)
      fixe += ligneFixe + ligneMateriel
      horaire += ligneHoraire
      detail.push({ fixe: ligneFixe, materiel: ligneMateriel, horaire: ligneHoraire })
    }
    return { fixe, horaire, detail }
  } catch {
    return { fixe: 0, horaire: 0, detail: [] }
  }
}

// Une ligne « brute » (ticket × item lié) AVANT calcul des coûts.
type LienTicketItem = {
  ticketId: number
  itemId: number
  itemType: string
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

  // BASE DES LIGNES : les liens (ticket × item) viennent de GLPI, pas de SQLite.
  // On interroge chaque ticket en parallèle pour ses items liés.
  const ticketIds = [...ticketsParId.keys()]
  const liens: LienTicketItem[] = []
  const liensParTicket = await Promise.all(
    ticketIds.map(async (id) => {
      try {
        const items = await v1GetTicketItems(id)
        return items.map((item) => ({
          ticketId: id,
          itemId: item.items_id,
          itemType: item.itemtype,
        }))
      } catch {
        return [] as LienTicketItem[]
      }
    }),
  )
  for (const groupe of liensParTicket) liens.push(...groupe)

  // Nouveau prix SQLite indexé par (ticket:item) — vient se superposer aux liens.
  // On conserve aussi tous les coûts bruts par ticket pour le détail dépliable.
  const prixParCle = new Map<string, number>()
  const coutsSqliteParCle = new Map<string, DetailCoutSqlite[]>()
  for (const a of allocations) {
    if (!ticketsParId.has(a.ticketId)) continue // coût orphelin (ticket purgé)
    const cle = `${a.ticketId}:${a.itemType.toLowerCase()}:${a.itemId}`
    if (!a.annule) prixParCle.set(cle, (prixParCle.get(cle) ?? 0) + (Number(a.cout) || 0))
    const liste = coutsSqliteParCle.get(cle) ?? []
    liste.push({
      id: a.id,
      itemId: a.itemId,
      itemType: a.itemType,
      cout: Number(a.cout) || 0,
      annule: a.annule,
    })
    coutsSqliteParCle.set(cle, liste)
  }

  // Coûts GLPI récupérés UNE fois par ticket ayant au moins un item lié.
  const ticketsAvecItems = [...new Set(liens.map((l) => l.ticketId))]
  const coutsGlpiParTicket = new Map<number, CoutsGlpiTicket>()
  await Promise.all(
    ticketsAvecItems.map(async (id) => {
      coutsGlpiParTicket.set(id, await coutsGlpiDuTicket(id))
    }),
  )

  // Regroupe les liens (ticket × item) par ticket → une ligne par ticket.
  const liensParTicketId = new Map<number, LienTicketItem[]>()
  for (const lien of liens) {
    const liste = liensParTicketId.get(lien.ticketId) ?? []
    liste.push(lien)
    liensParTicketId.set(lien.ticketId, liste)
  }

  return [...liensParTicketId.entries()]
    .map(([ticketId, liensTicket]) => {
      const ticket = ticketsParId.get(ticketId)
      const coutsGlpi = coutsGlpiParTicket.get(ticketId) ?? { fixe: 0, horaire: 0, detail: [] }

      const items: ItemCout[] = liensTicket.map((lien) => {
        const cle = `${ticketId}:${lien.itemType.toLowerCase()}:${lien.itemId}`
        const asset = assets.get(`${lien.itemType.toLowerCase()}:${lien.itemId}`)
        return {
          itemId: lien.itemId,
          itemType: lien.itemType,
          typeCle: asset?.typeCle ?? lien.itemType.toLowerCase(),
          nomItem: asset?.nomItem ?? '(item introuvable)',
          nouveauPrixParItem: prixParCle.get(cle) ?? 0,
          coutsSqlite: coutsSqliteParCle.get(cle) ?? [],
        }
      })

      // Coût GLPI compté UNE fois pour le ticket ; nouveau prix = somme des items.
      const coutFixe = coutsGlpi.fixe
      const coutHoraire = coutsGlpi.horaire
      const nouveauPrix = items.reduce((s, i) => s + i.nouveauPrixParItem, 0)
      const total = coutFixe + coutHoraire + nouveauPrix

      return {
        allocationId: ticketId, // une ligne = un ticket (:key)
        ticketId,
        ticketNom: ticket?.name?.trim() || `Ticket #${ticketId}`,
        nbItemsLies: items.length,
        items,
        coutFixe,
        coutHoraire,
        nouveauPrix,
        total,
        totalSansHoraire: coutFixe + nouveauPrix,
        detail: {
          coutsGlpi: coutsGlpi.detail,
        },
      }
    })
    .sort((a, b) => b.ticketId - a.ticketId)
}
