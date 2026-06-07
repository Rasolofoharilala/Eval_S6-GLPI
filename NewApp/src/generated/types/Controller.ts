export interface Controller {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  is_raid?: boolean
  interface?: InterfaceType
  model?: DeviceControlModel
}
