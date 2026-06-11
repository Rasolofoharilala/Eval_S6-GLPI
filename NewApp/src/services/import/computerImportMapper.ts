import type { ComputerCreatePayload } from '@/services/generated/computerService'
import type { AssetCsvRow } from './assetImportTypes'
import { ensureReferenceByName } from './glpiEnsureService'
import { referenceConfig } from './glpiReferenceConfig'
import { ensureUserByFullName } from './userEnsureService'

function toRelation(id?: number | null) {
  if (!id) {
    return undefined
  }

  return {
    id,
  }
}

export async function mapCsvRowToComputerInput(row: AssetCsvRow): Promise<ComputerCreatePayload> {
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
    referenceConfig.computerModel.endpoint,
    row.model,
    referenceConfig.computerModel.autoCreate,
  )

  const user = await ensureUserByFullName(row.user)

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
