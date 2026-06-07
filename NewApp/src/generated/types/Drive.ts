export interface Drive {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  is_writer?: boolean
  speed?: string
  interface?: InterfaceType
  model?: DeviceDriveModel
}
