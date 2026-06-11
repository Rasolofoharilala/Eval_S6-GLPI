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
  /** Bilan de l'association des éléments au ticket. */
  links?: {
    linked: number
    /** Couple déjà présent en base (import relancé) : ni succès ni erreur. */
    already: number
    skipped: number
    failed: number
  }
}

export type ImageImportResult = {
  name: string
  success: boolean
  /** Asset absent du registre : ignoré légitime, pas une erreur d'upload. */
  skipped?: boolean
  error?: string
}

export type CoutImportResult = {
  numTicket: string
  success: boolean
  error?: string
}
