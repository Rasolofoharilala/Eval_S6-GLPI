import type { CsvRow } from '@/services/csv/csvTypes'

export type TicketCsvRow = CsvRow & {
  ref_ticket: string
  date: string
  heure: string
  type: string
  titre: string
  description: string
  status: string
  priority: string
  items: string
}

export type ParsedTicketRow = Omit<TicketCsvRow, 'ref_ticket' | 'items'> & {
  ref_ticket: number
  items: string[]
}
