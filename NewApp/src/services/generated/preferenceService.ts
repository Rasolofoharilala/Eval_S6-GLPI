// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/Preference.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPreferences = () => getAll(ENDPOINTS.ADMINISTRATION_USER_ME_PREFERENCE)
