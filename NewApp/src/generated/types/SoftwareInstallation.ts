export interface SoftwareInstallation {
  id?: number
  itemtype?: string
  items_id?: number
  softwareversion?: SoftwareVersion
  date_install?: string
  entity?: Entity
  is_dynamic?: boolean
}
