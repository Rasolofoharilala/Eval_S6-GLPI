export interface SIMCard {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  voltage?: number
  allow_voip?: boolean
  type?: DeviceSimcardType
}
