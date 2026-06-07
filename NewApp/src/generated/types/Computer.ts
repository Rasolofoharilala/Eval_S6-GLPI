export interface Computer {
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
  type?: ComputerType
  model?: ComputerModel
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  uuid?: string
  network?: Network
  autoupdatesystem?: AutoUpdateSystem
  is_template?: boolean
  template_name?: string
  is_dynamic?: boolean
  ticket_tco?: number
  last_inventory_update?: string
  last_boot?: string
}
