export interface Location {
  id?: number
  name?: string
  completename?: string
  code?: string
  alias?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: Location
  level?: number
  room?: string
  building?: string
  address?: string
  town?: string
  postcode?: string
  state?: string
  country?: string
  latitude?: string
  longitude?: string
  altitude?: string
  date_creation?: string
  date_mod?: string
}
