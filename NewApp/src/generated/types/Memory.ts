export interface Memory {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  frequency?: string
  size_default?: number
  type?: DeviceMemoryType
  model?: DeviceMemoryModel
}
