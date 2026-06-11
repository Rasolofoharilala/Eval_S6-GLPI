import type { AssetCsvRow } from './assetImportTypes'
import { ensureReferenceByName } from './glpiEnsureService'
import { referenceConfig } from './glpiReferenceConfig'
import { ensureUserByFullName } from './userEnsureService'

// Mapper générique pour les types du parc (Computer, Monitor, Printer,
// Peripheral, Phone). Tous partagent les mêmes champs ; seul l'endpoint du
// modèle (Dropdowns/<Type>Model) diffère.

type RelationReference = { id: number }

export type ParcAssetPayload = {
  name: string
  otherserial: string
  status?: RelationReference
  location?: RelationReference
  manufacturer?: RelationReference
  model?: RelationReference
  user?: RelationReference
}

function toRelation(id?: number | null): RelationReference | undefined {
  return id ? { id } : undefined
}

export async function mapCsvRowToParcAsset(
  row: AssetCsvRow,
  modelEndpoint: string,
): Promise<ParcAssetPayload> {
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

  const model = await ensureReferenceByName(modelEndpoint, row.model, true)

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
