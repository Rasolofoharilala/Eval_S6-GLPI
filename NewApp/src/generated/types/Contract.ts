export interface Contract {
  id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: ContractType
  is_deleted?: boolean
  costs?: Record<string, unknown>[]
  number?: string
  location?: Location
  date_begin?: string
  duration?: number
  notice_period?: number
  renewal_period?: number
  invoice_period?: number
  accounting_number?: string
  week_begin_hour?: string
  week_end_hour?: string
  saturday_begin_hour?: string
  saturday_end_hour?: string
  sunday_begin_hour?: string
  sunday_end_hour?: string
  use_saturday?: boolean
  use_sunday?: boolean
  max_links_allowed?: number
  alert?: number
  renewal_type?: number
  template_name?: string
  is_template?: boolean
}
