export interface SNMPCredential {
  id?: number
  name?: string
  snmp_version?: string
  community?: string
  username?: string
  authentication?: string
  auth_passphrase?: string
  encryption?: string
  priv_passphrase?: string
  is_deleted?: boolean
}
