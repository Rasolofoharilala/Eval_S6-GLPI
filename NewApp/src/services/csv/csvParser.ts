import type { CsvParseResult, CsvRow } from './csvTypes'

// Parser RFC-4180 : gère les champs entre guillemets contenant des virgules/sauts de ligne
function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        fields.push(current.trim())
        current = ''
      } else {
        current += ch
      }
    }
  }
  fields.push(current.trim())
  return fields
}

export async function parseCsvFile(file: File): Promise<CsvParseResult> {
  const csvContent = await file.text()

  const lines = csvContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')

  const rows = lines.map(parseCsvLine)

  const headers = (rows[0] ?? []).map((header) => header.toLowerCase())

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
