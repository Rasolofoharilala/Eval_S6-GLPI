// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ClusterType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ClusterType } from '@/types/generated'

export type { ClusterType } from '@/types/generated'

export const getClustertypes = () => getAll<ClusterType>(ENDPOINTS.DROPDOWNS_CLUSTERTYPE)

export const getClustertypeById = (id: number) =>
  getById<ClusterType>(ENDPOINTS.DROPDOWNS_CLUSTERTYPE, id)
