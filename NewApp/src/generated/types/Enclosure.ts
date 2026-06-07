export interface Enclosure {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  serial?: string
  otherserial?: string
  model?: EnclosureModel
  manufacturer?: Manufacturer
  state?: State
  user?: User
  group?: Record<string, unknown>[]
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  is_deleted?: boolean
  orientation?: number
  power_supplies?: number
  date_creation?: string
  date_mod?: string
  is_template?: boolean
  template_name?: string
}
