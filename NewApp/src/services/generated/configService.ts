// Auto-generated file. Do not edit manually.
// Service generated for /Setup/Config.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Config } from '@/types/generated'

export type { Config } from '@/types/generated'

export const getConfigs = () => getAll<Config>(ENDPOINTS.SETUP_CONFIG)
