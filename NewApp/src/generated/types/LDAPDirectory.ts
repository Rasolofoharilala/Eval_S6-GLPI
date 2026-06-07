export interface LDAPDirectory {
  id?: number
  name?: string
  host?: string
  port?: number
  is_default?: boolean
  is_active?: boolean
  comment?: string
  connection_filter?: string
  basedn?: string
  use_bind?: boolean
  rootdn?: string
  rootdn_password?: string
  login_field?: string
  sync_field?: string
}
