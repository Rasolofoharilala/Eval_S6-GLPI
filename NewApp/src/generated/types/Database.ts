export interface Database {
  id?: number
  name?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  is_deleted?: boolean
  instance?: DatabaseInstance
}
