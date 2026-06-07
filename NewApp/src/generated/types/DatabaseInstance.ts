export interface DatabaseInstance {
  id?: number
  entity?: Entity
  is_recursive?: boolean
  name?: string
  comment?: string
  version?: string
  port?: string
  path?: string
  type?: DatabaseInstanceType
  category?: DatabaseInstanceCategory
  location?: Location
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  state?: State
  itemtype?: string
  items_id?: number
  is_onbackup?: boolean
  is_active?: boolean
  is_deleted?: boolean
  is_dynamic?: boolean
  date_creation?: string
  date_mod?: string
  date_lastboot?: string
  date_lastbackup?: string
  database?: Record<string, unknown>[]
}
