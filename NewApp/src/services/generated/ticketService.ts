import { create, getAll, getById } from '@/api/crudClient'
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

export const getTickets = () => getAll<Ticket>(ENDPOINTS.ASSISTANCE_TICKET)

export const getTicketById = (id: number) => getById<Ticket>(ENDPOINTS.ASSISTANCE_TICKET, id)

export const createTicket = (payload: TicketCreatePayload) =>
  create<Ticket, TicketCreatePayload>(ENDPOINTS.ASSISTANCE_TICKET, payload)
