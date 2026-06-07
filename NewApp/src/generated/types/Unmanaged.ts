export interface Unmanaged {
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
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  network?: Network
  autoupdatesystem?: AutoUpdateSystem
  is_dynamic?: boolean
  sysdescr?: string
  agent?: Agent
  itemtype?: string
  accepted?: boolean
  is_hub?: boolean
  ip?: string
  snmp_credential?: SNMPCredential
  last_inventory_update?: string
}
