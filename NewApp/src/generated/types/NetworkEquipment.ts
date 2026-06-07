export interface NetworkEquipment {
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
  type?: NetworkEquipmentType
  model?: NetworkEquipmentModel
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  uuid?: string
  network?: Network
  autoupdatesystem?: AutoUpdateSystem
  ram?: number
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  sysdescr?: string
  cpu?: number
  last_inventory_update?: string
  snmp_credential?: SNMPCredential
}
