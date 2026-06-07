export interface DomainRecord {
  id?: number
  name?: string
  comment?: string
  data?: string
  data_obj?: string
  entity?: Entity
  is_recursive?: boolean
  domain?: Domain
  type?: DomainRecordType
  ttl?: number
  user?: User
  user_tech?: User
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
}
