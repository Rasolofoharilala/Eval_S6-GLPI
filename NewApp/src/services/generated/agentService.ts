// Auto-generated file. Do not edit manually.
// Service generated for /Inventory/Agent.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Agent } from '@/types/generated'

export type { Agent } from '@/types/generated'

export const getAgents = () => getAll<Agent>(ENDPOINTS.INVENTORY_AGENT)

export const getAgentById = (id: number) => getById<Agent>(ENDPOINTS.INVENTORY_AGENT, id)
