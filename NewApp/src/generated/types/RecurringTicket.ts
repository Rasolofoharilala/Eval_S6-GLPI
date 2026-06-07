export interface RecurringTicket {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_active?: boolean
  template?: TicketTemplate
  date_begin?: string
  date_end?: string
  periodicity?: number
  create_before?: number
  date_next_creation?: string
  calendar?: Calendar
  ticket_per_item?: boolean
}
