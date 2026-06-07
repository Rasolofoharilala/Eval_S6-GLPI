export interface SLM {
  id?: number
  name?: string
  entity?: Entity
  is_recursive?: boolean
  comment?: string
  use_ticket_calendar?: boolean
  calendar?: Calendar
  date_creation?: string
  date_mod?: string
}
