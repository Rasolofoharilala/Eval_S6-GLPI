// Auto-generated file. Do not edit manually.
// Service generated for /Administration/ApprovalSubstitute.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ApprovalSubstitute } from '@/types/generated'

export type { ApprovalSubstitute } from '@/types/generated'

export const getApprovalsubstitutes = () =>
  getAll<ApprovalSubstitute>(ENDPOINTS.ADMINISTRATION_APPROVALSUBSTITUTE)

export const getApprovalsubstituteById = (id: number) =>
  getById<ApprovalSubstitute>(ENDPOINTS.ADMINISTRATION_APPROVALSUBSTITUTE, id)
