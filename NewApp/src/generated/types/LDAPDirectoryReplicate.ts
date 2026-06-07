export interface LDAPDirectoryReplicate {
  id?: number
  ldap_directory?: AuthLDAP
  host?: string
  port?: number
  name?: string
  timeout?: number
}
