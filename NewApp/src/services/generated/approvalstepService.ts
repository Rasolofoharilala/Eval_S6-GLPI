// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ApprovalStep.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getApprovalsteps = () => getAll(ENDPOINTS.DROPDOWNS_APPROVALSTEP)

export const getApprovalstepById = (id: number) => getById(ENDPOINTS.DROPDOWNS_APPROVALSTEP, id)
