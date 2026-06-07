export interface OLA {
  id?: number
  name?: string
  slm?: SLM
  entity?: Entity
  is_recursive?: boolean
  type?: number
  comment?: string
  time?: number
  time_unit?: string
  use_ticket_calendar?: boolean
  calendar?: Calendar
  end_of_working_day?: boolean
  date_creation?: string
  date_mod?: string
}
