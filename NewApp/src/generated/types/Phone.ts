export interface Phone {
  id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: PhoneType
  model?: PhoneModel
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  uuid?: string
  autoupdatesystem?: AutoUpdateSystem
  brand?: string
  power_supply?: PhonePowerSupply
  number_line?: string
  have_headset?: boolean
  have_hp?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  last_inventory_update?: string
}
