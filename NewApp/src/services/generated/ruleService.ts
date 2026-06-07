// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection/Ticket/Rule.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Rule } from '@/types/generated'

export type { Rule } from '@/types/generated'

export const getRules = () => getAll<Rule>(ENDPOINTS.RULE_COLLECTION_TICKET_RULE)

export const getRuleById = (id: number) => getById<Rule>(ENDPOINTS.RULE_COLLECTION_TICKET_RULE, id)
