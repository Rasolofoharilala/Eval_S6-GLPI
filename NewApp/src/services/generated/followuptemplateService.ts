// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/FollowupTemplate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getFollowuptemplates = () =>
  getAll(ENDPOINTS.DROPDOWNS_FOLLOWUPTEMPLATE)

export const getFollowuptemplateById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_FOLLOWUPTEMPLATE, id)
