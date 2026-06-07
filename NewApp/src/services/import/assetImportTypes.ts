import type { CsvRow } from '@/services/csv/csvTypes'

export type AssetCsvRow = CsvRow & {
  name: string
  status: string
  location: string
  manufacturer: string
  item_type: string
  model: string
  inventory_number: string
  user: string
}

export type ImportResult = {
  name: string
  itemType: string
  success: boolean
  skipped?: boolean
  existingId?: number
  error?: string
}
