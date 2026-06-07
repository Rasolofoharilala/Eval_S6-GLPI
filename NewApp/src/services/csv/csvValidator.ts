import type { CsvParseResult } from './csvTypes'

export function hasRequiredHeaders(csvResult: CsvParseResult, requiredHeaders: string[]): boolean {
  return requiredHeaders.every((header) => csvResult.headers.includes(header.toLowerCase()))
}
