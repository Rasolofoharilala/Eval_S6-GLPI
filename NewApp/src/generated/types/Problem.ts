export interface Problem {
  id?: number
  name?: string
  content?: string
  user_recipient?: User
  user_editor?: User
  is_deleted?: boolean
  category?: ITILCategory
  location?: Location
  urgency?: number
  impact?: number
  priority?: number
  actiontime?: number
  begin_waiting_date?: string
  waiting_duration?: number
  resolution_duration?: number
  close_duration?: number
  resolution_date?: string
  date_creation?: string
  date_mod?: string
  date?: string
  date_solve?: string
  date_close?: string
  status?: Record<string, unknown>
  entity?: Entity
  team?: Record<string, unknown>[]
  costs?: Record<string, unknown>[]
}
