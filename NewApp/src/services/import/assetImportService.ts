import { httpClient } from '@/api/httpClient'
import { trouverTypeParc } from '@/config/parc'
import { messageErreur } from '@/utils/messageErreur'

import { mapCsvRowToParcAsset } from './parcAssetMapper'

import type { AssetCsvRow, ImportResult } from './assetImportTypes'
import { assetAlreadyExists } from './glpiAssetLookupService'
import { importLogger } from './importLogger'

// Les types du parc (Computer, Monitor, Printer, Peripheral, Phone) et leurs
// endpoints sont définis une seule fois dans src/config/parc.ts.

async function createAssetByType(row: AssetCsvRow): Promise<{ id: number }> {
  const type = trouverTypeParc(row.item_type)

  if (!type) {
    throw new Error(`Type non encore supporté : ${row.item_type}`)
  }

  const payload = await mapCsvRowToParcAsset(row, type.modelEndpoint)
  const res = await httpClient.post<{ id: number }>(type.endpoint, payload)
  return { id: res.data?.id ?? 0 }
}

export async function importAssetRows(rows: AssetCsvRow[]): Promise<ImportResult[]> {
  const results: ImportResult[] = []

  for (const row of rows) {
    try {
      const type = trouverTypeParc(row.item_type)

      if (!type) {
        const error = `Type non supporté : ${row.item_type}`
        importLogger.skip(`Inventaire « ${row.name} » : ${error}`)
        results.push({ name: row.name, itemType: row.item_type, success: false, error })
        continue
      }

      const existingAsset = await assetAlreadyExists(type.endpoint, row.name, row.inventory_number)

      if (existingAsset) {
        importLogger.info(`Inventaire « ${row.name} » déjà existant (id ${existingAsset.id})`)
        results.push({
          name: row.name,
          itemType: row.item_type,
          success: true,
          skipped: true,
          existingId: existingAsset.id,
        })

        continue
      }

      const created = await createAssetByType(row)

      importLogger.success(`Inventaire « ${row.name} » (${row.item_type}) créé — id ${created.id}`)
      results.push({
        name: row.name,
        itemType: row.item_type,
        success: true,
        existingId: created.id,
      })
    } catch (error) {
      const message = messageErreur(error)
      importLogger.error(`Inventaire « ${row.name} » : ${message}`)
      results.push({
        name: row.name,
        itemType: row.item_type,
        success: false,
        error: message,
      })
    }
  }

  return results
}
