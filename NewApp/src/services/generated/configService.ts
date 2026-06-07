// Auto-generated file. Do not edit manually.
// Service generated for /Setup/Config.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getConfigs = () => getAll(ENDPOINTS.SETUP_CONFIG)
