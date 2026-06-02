// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection/Ticket/ActionType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getActiontypes = () =>
  getAll(ENDPOINTS.RULE_COLLECTION_TICKET_ACTIONTYPE)
