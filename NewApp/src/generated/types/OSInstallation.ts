export interface OSInstallation {
  id?: number
  itemtype?: string
  items_id?: number
  operatingsystem?: OperatingSystem
  version?: OperatingSystemVersion
  edition?: OperatingSystemEdition
  servicepack?: OperatingSystemServicePack
  architecture?: OperatingSystemArchitecture
  kernel_version?: OperatingSystemKernelVersion
  license_number?: string
  licenseid?: string
  company?: string
  owner?: string
  hostid?: string
  date_install?: string
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  entity?: Entity
  is_recursive?: boolean
}
