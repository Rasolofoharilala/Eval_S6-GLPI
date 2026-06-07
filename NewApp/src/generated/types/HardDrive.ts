export interface HardDrive {
  id?: number
  designation?: string
  comment?: string
  manufacturer?: Manufacturer
  entity?: Entity
  is_recursive?: boolean
  date_creation?: string
  date_mod?: string
  rpm?: string
  cache?: string
  capacity_default?: number
  interface?: InterfaceType
  model?: DeviceHardDriveModel
}
