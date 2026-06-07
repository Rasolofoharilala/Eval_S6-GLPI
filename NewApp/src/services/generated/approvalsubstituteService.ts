// Auto-generated file. Do not edit manually.
// Service generated for /Administration/ApprovalSubstitute.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getApprovalsubstitutes = () => getAll(ENDPOINTS.ADMINISTRATION_APPROVALSUBSTITUTE)

export const getApprovalsubstituteById = (id: number) =>
  getById(ENDPOINTS.ADMINISTRATION_APPROVALSUBSTITUTE, id)
