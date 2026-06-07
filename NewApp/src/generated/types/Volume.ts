export interface Volume {
  id?: number
  itemtype?: string
  items_id?: number
  entity?: Entity
  name?: string
  device?: string
  mount_point?: string
  filesystem?: Filesystem
  total_size?: number
  free_size?: number
  is_deleted?: boolean
  is_dynamic?: boolean
  encryption_status?: number
  encryption_tool?: string
  encryption_algorithm?: string
  encryption_type?: string
  date_creation?: string
  date_mod?: string
}
