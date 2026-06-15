// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/Asset.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { AssetStats } from '@/types/generated'

export type { AssetStats } from '@/types/generated'

export const getAssets = () => getAll<AssetStats>(ENDPOINTS.ASSISTANCE_STAT_TICKET_ASSET)
