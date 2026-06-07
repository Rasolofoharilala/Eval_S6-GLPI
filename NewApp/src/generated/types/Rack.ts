export interface Rack {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  location?: Location
  serial?: string
  otherserial?: string
  model?: RackModel
  manufacturer?: Manufacturer
  type?: RackType
  state?: State
  user?: User
  group?: Record<string, unknown>[]
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  width?: number
  height?: number
  depth?: number
  number_units?: number
  is_deleted?: boolean
  room?: DCRoom
  room_orientation?: number
  position?: string
  bgcolor?: string
  max_power?: number
  measured_power?: number
  max_weight?: number
  items?: Record<string, unknown>[]
  date_creation?: string
  date_mod?: string
}
