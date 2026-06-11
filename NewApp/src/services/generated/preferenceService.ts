// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/Preference.

import { getAll } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { UserPreferences } from '@/types/generated'

export type { UserPreferences } from '@/types/generated'

export const getPreferences = () =>
  getAll<UserPreferences>(ENDPOINTS.ADMINISTRATION_USER_ME_PREFERENCE)
