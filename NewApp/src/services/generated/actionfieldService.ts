// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection/Ticket/ActionField.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { RuleActionField } from '@/types/generated'

export type { RuleActionField } from '@/types/generated'

export const getActionfields = () =>
  getAll<RuleActionField>(ENDPOINTS.RULE_COLLECTION_TICKET_ACTIONFIELD)
