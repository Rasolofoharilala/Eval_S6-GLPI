// Auto-generated file. Do not edit manually.
// Service generated for /Inventory/Agent.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getAgents = () => getAll(ENDPOINTS.INVENTORY_AGENT)

export const getAgentById = (id: number) => getById(ENDPOINTS.INVENTORY_AGENT, id)
