import type { MonitorInput } from '@/types/generated'
import type { AssetCsvRow } from './assetImportTypes'
import { ensureReferenceByName } from './glpiEnsureService'
import { referenceConfig } from './glpiReferenceConfig'

function toRelation(id?: number | null) {
  if (!id) {
    return undefined
  }

  return {
    id,
  }
}

export async function mapCsvRowToMonitorInput(row: AssetCsvRow): Promise<MonitorInput> {
  const status = await ensureReferenceByName(
    referenceConfig.status.endpoint,
    row.status,
    referenceConfig.status.autoCreate,
  )

  const location = await ensureReferenceByName(
    referenceConfig.location.endpoint,
    row.location,
    referenceConfig.location.autoCreate,
  )

  const manufacturer = await ensureReferenceByName(
    referenceConfig.manufacturer.endpoint,
    row.manufacturer,
    referenceConfig.manufacturer.autoCreate,
  )

  const model = await ensureReferenceByName(
    referenceConfig.monitorModel.endpoint,
    row.model,
    referenceConfig.monitorModel.autoCreate,
  )

  const user = await ensureReferenceByName(
    referenceConfig.user.endpoint,
    row.user,
    referenceConfig.user.autoCreate,
  )

  return {
    name: row.name,
    otherserial: row.inventory_number,

    status: toRelation(status?.id),
    location: toRelation(location?.id),
    manufacturer: toRelation(manufacturer?.id),
    model: toRelation(model?.id),
    user: toRelation(user?.id),
  }
}
