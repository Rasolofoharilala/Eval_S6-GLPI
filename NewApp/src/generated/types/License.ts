export interface License {
  id?: number
  name?: string
  comment?: string
  status?: State
  location?: Location
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: SoftwareLicenseType
  manufacturer?: Manufacturer
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  user?: User
  group?: Record<string, unknown>[]
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  completename?: string
  level?: number
}
