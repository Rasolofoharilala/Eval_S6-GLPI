export interface Appliance {
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
  type?: ApplianceType
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  environment?: ApplianceEnvironment
  external_id?: string
  is_helpdesk_visible?: boolean
}
