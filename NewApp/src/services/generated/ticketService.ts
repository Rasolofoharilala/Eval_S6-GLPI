import { create, getById } from '@/api/crudClient'
import { v1GetAll } from '@/api/glpiV1Client'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Ticket, TicketInput } from '@/types/generated'

export type { Ticket, TicketInput } from '@/types/generated'

type RelationReference = {
  id: number
}

type TicketTeamMemberInput = {
  type: 'User' | 'Group' | 'Supplier'
  id: number
  role: 'requester' | 'assigned' | 'observer'
}

export type TicketCreatePayload = Omit<
  TicketInput,
  | 'category'
  | 'entity'
  | 'location'
  | 'ola_tto'
  | 'ola_ttr'
  | 'request_type'
  | 'sla_tto'
  | 'sla_ttr'
  | 'status'
  | 'team'
  | 'user_recipient'
> & {
  category?: RelationReference
  entity?: RelationReference
  location?: RelationReference
  ola_tto?: RelationReference
  ola_ttr?: RelationReference
  request_type?: RelationReference
  sla_tto?: RelationReference
  sla_ttr?: RelationReference
  status?: RelationReference
  team?: TicketTeamMemberInput[]
  user_recipient?: RelationReference
}

// Libellés des statuts GLPI (mêmes valeurs que l'interface).
const STATUS_LABELS: Record<number, string> = {
  1: 'Nouveau',
  2: 'En cours (Attribué)',
  3: 'En cours (Planifié)',
  4: 'En attente',
  5: 'Résolu',
  6: 'Clos',
}

// Forme brute d'un ticket renvoyée par l'API v1 (champs à plat).
type TicketV1 = {
  id?: number
  status?: number
  priority?: number
  urgency?: number
  impact?: number
  type?: number
  name?: string
  date?: string
}

// Convertit un ticket v1 (status entier) vers la forme v2 attendue par les
// dashboards (status objet {id, name}). Les autres champs sont déjà compatibles.
function v1VersTicket(brut: TicketV1): Ticket {
  const statusId = brut.status ?? 1
  return {
    ...brut,
    status: { id: statusId as 1 | 2 | 3 | 4 | 5 | 6, name: STATUS_LABELS[statusId] ?? '' },
  } as Ticket
}

// IMPORTANT : on passe par l'API v1, pas v2. L'API v2.3 plafonne les listes à
// 100 éléments ET ignore l'offset du `range` — elle ne peut donc jamais
// renvoyer plus de 100 tickets (on en a 120). L'API v1 pagine correctement
// et respecte is_deleted=0 (corbeille exclue).
export async function getTickets(): Promise<Ticket[]> {
  const bruts = await v1GetAll<TicketV1>('Ticket')
  return bruts.map(v1VersTicket)
}

export const getTicketById = (id: number) => getById<Ticket>(ENDPOINTS.ASSISTANCE_TICKET, id)

export const createTicket = (payload: TicketCreatePayload) =>
  create<Ticket, TicketCreatePayload>(ENDPOINTS.ASSISTANCE_TICKET, payload)
