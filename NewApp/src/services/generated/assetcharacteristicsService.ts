// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/AssetCharacteristics.

import { getAll } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { AssetCharacteristicsStats } from '@/types/generated'

export type { AssetCharacteristicsStats } from '@/types/generated'

export const getAssetcharacteristicslist = () =>
  getAll<AssetCharacteristicsStats>(ENDPOINTS.ASSISTANCE_STAT_TICKET_ASSETCHARACTERISTICS)
