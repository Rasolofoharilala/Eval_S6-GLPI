import { httpClient } from '@/api/httpClient'

import { mapCsvRowToParcAsset } from './parcAssetMapper'

import type { AssetCsvRow, ImportResult } from './assetImportTypes'
import { assetAlreadyExists } from './glpiAssetLookupService'
import { importLogger } from './importLogger'

function getErrorMessage(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Erreur inconnue'
  }

  const err = error as {
    response?: {
      data?: {
        title?: string
        detail?: string
        message?: string
      }
      status?: number
    }
    message?: string
  }

  return (
    err.response?.data?.title ||
    err.response?.data?.detail ||
    err.response?.data?.message ||
    err.message ||
    'Erreur inconnue'
  )
}

function normalizeItemType(value: string): string {
  return value.trim().toLowerCase()
}

// Types du parc convenus : Computer, Monitor, Printer, Peripheral, Phone.
// Chacun a son endpoint de collection et son endpoint de modèle.
const PARC_TYPES: Record<string, { endpoint: string; modelEndpoint: string }> = {
  computer: { endpoint: '/Assets/Computer', modelEndpoint: '/Dropdowns/ComputerModel' },
  monitor: { endpoint: '/Assets/Monitor', modelEndpoint: '/Dropdowns/MonitorModel' },
  printer: { endpoint: '/Assets/Printer', modelEndpoint: '/Dropdowns/PrinterModel' },
  peripheral: { endpoint: '/Assets/Peripheral', modelEndpoint: '/Dropdowns/PeripheralModel' },
  phone: { endpoint: '/Assets/Phone', modelEndpoint: '/Dropdowns/PhoneModel' },
}

function getEndpointByItemType(itemType: string): string | null {
  return PARC_TYPES[normalizeItemType(itemType)]?.endpoint ?? null
}

async function createAssetByType(row: AssetCsvRow): Promise<{ id: number }> {
  const config = PARC_TYPES[normalizeItemType(row.item_type)]

  if (!config) {
    throw new Error(`Type non encore supporté : ${row.item_type}`)
  }

  const payload = await mapCsvRowToParcAsset(row, config.modelEndpoint)
  const res = await httpClient.post<{ id: number }>(config.endpoint, payload)
  return { id: res.data?.id ?? 0 }
}

export async function importAssetRows(rows: AssetCsvRow[]): Promise<ImportResult[]> {
  const results: ImportResult[] = []

  for (const row of rows) {
    try {
      const endpoint = getEndpointByItemType(row.item_type)

      if (!endpoint) {
        const error = `Type non supporté : ${row.item_type}`
        importLogger.skip(`Inventaire « ${row.name} » : ${error}`)
        results.push({ name: row.name, itemType: row.item_type, success: false, error })
        continue
      }

      const existingAsset = await assetAlreadyExists(endpoint, row.name, row.inventory_number)

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
      const message = getErrorMessage(error)
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
