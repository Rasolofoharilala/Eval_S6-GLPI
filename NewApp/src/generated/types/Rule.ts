export interface Rule {
  id?: number
  uuid?: string
  sub_type?: string
  entity?: Entity
  is_recursive?: boolean
  name?: string
  description?: string
  comment?: string
  is_active?: boolean
  match?: string
  condition?: number
  ranking?: number
  criteria?: Record<string, unknown>[]
  actions?: Record<string, unknown>[]
  date_creation?: string
  date_mod?: string
}
