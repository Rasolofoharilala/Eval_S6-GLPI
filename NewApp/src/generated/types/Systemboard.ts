export interface Systemboard {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  chipset?: string
  model?: DeviceMotherboardModel
}
