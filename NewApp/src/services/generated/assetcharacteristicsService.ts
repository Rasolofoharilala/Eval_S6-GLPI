// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/AssetCharacteristics.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getAssetcharacteristicslist = () =>
  getAll(ENDPOINTS.ASSISTANCE_STAT_TICKET_ASSETCHARACTERISTICS)
