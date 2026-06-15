// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ApprovalStep.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ApprovalStep } from '@/types/generated'

export type { ApprovalStep } from '@/types/generated'

export const getApprovalsteps = () => getAll<ApprovalStep>(ENDPOINTS.DROPDOWNS_APPROVALSTEP)

export const getApprovalstepById = (id: number) =>
  getById<ApprovalStep>(ENDPOINTS.DROPDOWNS_APPROVALSTEP, id)
