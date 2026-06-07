export interface EmailAuthServer {
  id?: number
  name?: string
  connection_string?: string
  domain?: string
  comment?: string
  is_active?: boolean
  is_default?: boolean
  date_creation?: string
  date_mod?: string
}
