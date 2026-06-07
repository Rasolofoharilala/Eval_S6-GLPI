export interface RecurringChange {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  is_active?: boolean
  template?: ChangeTemplate
  date_begin?: string
  date_end?: string
  periodicity?: number
  create_before?: number
  date_next_creation?: string
  calendar?: Calendar
}
