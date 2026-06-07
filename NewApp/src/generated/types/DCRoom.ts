export interface DCRoom {
  id?: number
  name?: string
  entity?: Entity
  is_recursive?: boolean
  is_deleted?: boolean
  location?: Location
  datacenter?: Datacenter
  rows?: number
  cols?: number
  date_creation?: string
  date_mod?: string
}
