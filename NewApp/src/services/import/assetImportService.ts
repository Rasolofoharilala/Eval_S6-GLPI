import { createComputer } from '@/services/generated/computerService'
import { createMonitor } from '@/services/generated/monitorService'

import { mapCsvRowToComputerInput } from './computerImportMapper'
import { mapCsvRowToMonitorInput } from './monitorImportMapper'

import type { AssetCsvRow, ImportResult } from './assetImportTypes'
import { assetAlreadyExists } from './glpiAssetLookupService'

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

function getEndpointByItemType(itemType: string): string | null {
  const normalizedItemType = normalizeItemType(itemType)

  if (normalizedItemType === 'computer') {
    return '/Assets/Computer'
  }

  if (normalizedItemType === 'monitor') {
    return '/Assets/Monitor'
  }

  return null
}

async function createAssetByType(row: AssetCsvRow): Promise<{ id: number }> {
  const itemType = normalizeItemType(row.item_type)

  if (itemType === 'computer') {
    const payload = await mapCsvRowToComputerInput(row)
    const result = await createComputer(payload)
    return { id: result.id ?? 0 }
  }

  if (itemType === 'monitor') {
    const payload = await mapCsvRowToMonitorInput(row)
    const result = await createMonitor(payload)
    return { id: result.id ?? 0 }
  }

  throw new Error(`Type non encore supporté : ${row.item_type}`)
}

export async function importAssetRows(rows: AssetCsvRow[]): Promise<ImportResult[]> {
  const results: ImportResult[] = []

  for (const row of rows) {
    try {
      const endpoint = getEndpointByItemType(row.item_type)

      if (!endpoint) {
        results.push({
          name: row.name,
          itemType: row.item_type,
          success: false,
          error: `Type non encore supporté : ${row.item_type}`,
        })

        continue
      }

      const existingAsset = await assetAlreadyExists(endpoint, row.name, row.inventory_number)

      if (existingAsset) {
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

      results.push({
        name: row.name,
        itemType: row.item_type,
        success: true,
        existingId: created.id,
      })
    } catch (error) {
      results.push({
        name: row.name,
        itemType: row.item_type,
        success: false,
        error: getErrorMessage(error),
      })
    }
  }

  return results
}
