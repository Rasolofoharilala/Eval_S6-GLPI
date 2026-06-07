export interface Battery {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  voltage?: number
  capacity?: number
  type?: DeviceBatteryType
  model?: DeviceBatteryModel
}
