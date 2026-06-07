export interface PDU {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  serial?: string
  otherserial?: string
  model?: PDUModel
  manufacturer?: Manufacturer
  type?: PDUType
  state?: State
  user?: User
  group?: Record<string, unknown>[]
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
}
