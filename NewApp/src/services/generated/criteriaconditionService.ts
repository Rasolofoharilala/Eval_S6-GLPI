// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection/Ticket/CriteriaCondition.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { RuleCriteriaCondition } from '@/types/generated'

export type { RuleCriteriaCondition } from '@/types/generated'

export const getCriteriaconditions = () =>
  getAll<RuleCriteriaCondition>(ENDPOINTS.RULE_COLLECTION_TICKET_CRITERIACONDITION)
