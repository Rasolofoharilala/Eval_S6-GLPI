// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/FollowupTemplate.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { FollowupTemplate } from '@/types/generated'

export type { FollowupTemplate } from '@/types/generated'

export const getFollowuptemplates = () =>
  getAll<FollowupTemplate>(ENDPOINTS.DROPDOWNS_FOLLOWUPTEMPLATE)

export const getFollowuptemplateById = (id: number) =>
  getById<FollowupTemplate>(ENDPOINTS.DROPDOWNS_FOLLOWUPTEMPLATE, id)
