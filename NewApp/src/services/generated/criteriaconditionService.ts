// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection/Ticket/CriteriaCondition.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { RuleCriteriaCondition } from '@/types/generated'

export type { RuleCriteriaCondition } from '@/types/generated'

export const getCriteriaconditions = () =>
  getAll<RuleCriteriaCondition>(ENDPOINTS.RULE_COLLECTION_TICKET_CRITERIACONDITION)
