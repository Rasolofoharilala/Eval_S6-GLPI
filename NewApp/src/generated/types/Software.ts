export interface Software {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  category?: SoftwareCategory
  manufacturer?: Manufacturer
  parent?: Software
  is_helpdesk_visible?: boolean
  user?: User
  group?: Record<string, unknown>[]
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  is_deleted?: boolean
  is_update?: boolean
  is_valid?: boolean
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
}
