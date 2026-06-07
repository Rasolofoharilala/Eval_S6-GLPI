export interface SoftwareLicense {
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
  type?: SoftwareLicenseType
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  completename?: string
  level?: number
}
