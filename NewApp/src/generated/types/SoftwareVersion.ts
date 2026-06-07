export interface SoftwareVersion {
  id?: number
  name?: string
  arch?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  software?: Software
  state?: State
  operating_system?: OperatingSystem
  date_creation?: string
  date_mod?: string
}
