export interface Ticket {
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
  type?: number
  external_id?: string
  request_type?: RequestType
  take_into_account_date?: string
  take_into_account_duration?: number
  sla_ttr?: SLA
  sla_tto?: SLA
  ola_ttr?: OLA
  ola_tto?: OLA
  sla_level_ttr?: SlaLevel
  ola_level_ttr?: OlaLevel
  sla_waiting_duration?: number
  ola_waiting_duration?: number
  ola_ttr_begin_date?: string
  ola_tto_begin_date?: string
  internal_resolution_date?: string
  internal_take_into_account_date?: string
  global_validation?: number
  status?: Record<string, unknown>
  entity?: Entity
  team?: Record<string, unknown>[]
  costs?: Record<string, unknown>[]
}
