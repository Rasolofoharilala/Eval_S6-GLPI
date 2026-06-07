// Auto-generated file. Do not edit manually.
// Service generated for /Management/Domain.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Domain } from '@/types/generated'

export type { Domain } from '@/types/generated'

export const getDomains = () => getAll<Domain>(ENDPOINTS.MANAGEMENT_DOMAIN)

export const getDomainById = (id: number) => getById<Domain>(ENDPOINTS.MANAGEMENT_DOMAIN, id)
