export type CsvRow = Record<string, string>

export type CsvParseResult = {
  headers: string[]
  rows: CsvRow[]
}
