// Auto-generated file. Do not edit manually.
// Service generated for /Administration/Profile.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Profile } from '@/types/generated'

export type { Profile } from '@/types/generated'

export const getProfiles = () => getAll<Profile>(ENDPOINTS.ADMINISTRATION_PROFILE)

export const getProfileById = (id: number) => getById<Profile>(ENDPOINTS.ADMINISTRATION_PROFILE, id)
