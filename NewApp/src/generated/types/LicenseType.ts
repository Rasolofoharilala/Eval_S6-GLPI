export interface LicenseType {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: SoftwareLicenseType
  level?: number
  completename?: string
  date_creation?: string
  date_mod?: string
}
