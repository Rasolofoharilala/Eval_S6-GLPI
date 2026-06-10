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

export type CoutCsvRow = CsvRow & {
  num_ticket: string
  duration_second: string
  time_cost: string
  fixed_cost: string
}

export type TicketImportResult = {
  ref: string
  title: string
  success: boolean
  skipped?: boolean
  existingId?: number
  error?: string
}

export type CoutImportResult = {
  numTicket: string
  success: boolean
  error?: string
}
