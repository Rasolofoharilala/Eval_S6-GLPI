export interface Printer {
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
  type?: PrinterType
  model?: PrinterModel
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  uuid?: string
  network?: Network
  autoupdatesystem?: AutoUpdateSystem
  has_serial?: boolean
  has_parallel?: boolean
  has_usb?: boolean
  has_wifi?: boolean
  has_ethernet?: boolean
  is_global?: boolean
  is_template?: boolean
  template_name?: string
  ticket_tco?: number
  is_dynamic?: boolean
  sysdescr?: string
  last_inventory_update?: string
  snmp_credential?: SNMPCredential
}
