// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Ticket.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getTickets = () => getAll(ENDPOINTS.ASSISTANCE_TICKET)

export const getTicketById = (id: number) => getById(ENDPOINTS.ASSISTANCE_TICKET, id)
