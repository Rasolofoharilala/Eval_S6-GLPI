// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Ticket.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Ticket } from '@/types/generated'

export type { Ticket } from '@/types/generated'

export const getTickets = () => getAll<Ticket>(ENDPOINTS.ASSISTANCE_TICKET)

export const getTicketById = (id: number) => getById<Ticket>(ENDPOINTS.ASSISTANCE_TICKET, id)
