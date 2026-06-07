export interface Sensor {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  type?: DeviceSensorType
  model?: DeviceSensorModel
  location?: Location
}
