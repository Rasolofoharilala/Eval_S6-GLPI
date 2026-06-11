// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection/Ticket/ActionType.

import { getAll } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { RuleActionType } from '@/types/generated'

export type { RuleActionType } from '@/types/generated'

export const getActiontypes = () =>
  getAll<RuleActionType>(ENDPOINTS.RULE_COLLECTION_TICKET_ACTIONTYPE)
