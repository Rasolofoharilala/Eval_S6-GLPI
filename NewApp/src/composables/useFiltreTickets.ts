// ═════════════════════════════════════════════════════════════════════════════
// COMPOSABLE : FILTRER UNE LISTE DE TICKETS
//
// On lui passe la liste brute des tickets, il renvoie :
//   - `filtres`   : l'état des filtres (lié aux <select> / champ de recherche)
//   - `ticketsFiltres` : la liste filtrée, recalculée automatiquement
//   - `reinitialiser()` : remet tous les filtres à zéro
//
// Filtres disponibles : recherche texte (id + titre), type, statut, priorité,
// urgence, impact, date d'ouverture (de … à …).
//
// Niveau simple : un objet `filtres` réactif + un computed avec des `if`.
// ═════════════════════════════════════════════════════════════════════════════

import { computed, reactive, type Ref } from 'vue'
import type { Ticket } from '@/services/generated/ticketService'

// 0 = "Tous" (pas de filtre sur ce champ). Sinon la valeur GLPI (1, 2, 3…).
export type FiltresTickets = {
  recherche: string
  type: number
  statut: number
  priorite: number
  urgence: number
  impact: number
  dateDebut: string // 'AAAA-MM-JJ' ou '' si non renseigné
  dateFin: string
}

function filtresVides(): FiltresTickets {
  return {
    recherche: '',
    type: 0,
    statut: 0,
    priorite: 0,
    urgence: 0,
    impact: 0,
    dateDebut: '',
    dateFin: '',
  }
}

// L'id du statut, qu'il soit objet {id} (forme v2) ou nombre.
function idStatut(ticket: Ticket): number {
  const s = ticket.status
  if (s && typeof s === 'object') return s.id ?? 0
  return 0
}

// La date d'ouverture au format 'AAAA-MM-JJ' (10 premiers caractères).
function dateOuverture(ticket: Ticket): string {
  const d = ticket.date ?? ticket.date_creation ?? ''
  return d.slice(0, 10)
}

export function useFiltreTickets(tickets: Ref<Ticket[]>) {
  const filtres = reactive<FiltresTickets>(filtresVides())

  const ticketsFiltres = computed<Ticket[]>(() => {
    const recherche = filtres.recherche.trim().toLowerCase()

    return tickets.value.filter((t) => {
      // Recherche texte : sur l'id et le titre
      if (recherche) {
        const titre = (t.name ?? '').toLowerCase()
        const id = String(t.id ?? '')
        if (!titre.includes(recherche) && !id.includes(recherche)) {
          return false
        }
      }

      if (filtres.type && t.type !== filtres.type) return false
      if (filtres.statut && idStatut(t) !== filtres.statut) return false
      if (filtres.priorite && t.priority !== filtres.priorite) return false
      if (filtres.urgence && t.urgency !== filtres.urgence) return false
      if (filtres.impact && t.impact !== filtres.impact) return false

      const date = dateOuverture(t)
      if (filtres.dateDebut && date < filtres.dateDebut) return false
      if (filtres.dateFin && date > filtres.dateFin) return false

      return true
    })
  })

  function reinitialiser() {
    Object.assign(filtres, filtresVides())
  }

  return { filtres, ticketsFiltres, reinitialiser }
}
