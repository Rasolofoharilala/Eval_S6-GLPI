// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection/Ticket/Rule.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getRules = () =>
  getAll(ENDPOINTS.RULE_COLLECTION_TICKET_RULE)

export const getRuleById = (id: number) =>
  getById(ENDPOINTS.RULE_COLLECTION_TICKET_RULE, id)
