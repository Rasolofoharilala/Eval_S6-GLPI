export interface Calendar {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  close_times?: Record<string, unknown>[]
  time_ranges?: Record<string, unknown>[]
}
