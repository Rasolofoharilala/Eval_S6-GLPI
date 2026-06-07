export interface Domain {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: DomainType
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  user?: User
  group?: Record<string, unknown>[]
  is_deleted?: boolean
  date_domain_creation?: string
  date_expiration?: string
  template_name?: string
  is_template?: boolean
  is_active?: boolean
  is_recursive?: boolean
}
