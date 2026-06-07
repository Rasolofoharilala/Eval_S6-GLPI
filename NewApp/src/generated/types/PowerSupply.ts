export interface PowerSupply {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  power?: string
  is_atx?: boolean
  model?: DevicePowerSupplyModel
}
