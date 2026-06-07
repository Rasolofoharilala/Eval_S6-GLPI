import type { CsvParseResult, CsvRow } from './csvTypes'

export async function parseCsvFile(file: File): Promise<CsvParseResult> {
  const csvContent = await file.text()

  const lines = csvContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')

  const rows = lines.map((line) => line.split(',').map((value) => value.trim()))

  const headers = rows[0].map((header) => header.toLowerCase())

  const dataRows = rows.slice(1)

  const parsedRows: CsvRow[] = dataRows.map((row) => {
    const object: CsvRow = {}

    headers.forEach((header, index) => {
      object[header] = row[index] ?? ''
    })

    return object
  })

  return {
    headers,
    rows: parsedRows,
  }
}
