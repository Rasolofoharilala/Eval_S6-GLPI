// Auto-generated file. Do not edit manually.
// Service generated for /Setup/Plugin.

import { getAll } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Plugin } from '@/types/generated'

export type { Plugin } from '@/types/generated'

export const getPlugins = () => getAll<Plugin>(ENDPOINTS.SETUP_PLUGIN)
