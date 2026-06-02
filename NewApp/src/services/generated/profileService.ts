// Auto-generated file. Do not edit manually.
// Service generated for /Administration/Profile.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getProfiles = () =>
  getAll(ENDPOINTS.ADMINISTRATION_PROFILE)

export const getProfileById = (id: number) =>
  getById(ENDPOINTS.ADMINISTRATION_PROFILE, id)
