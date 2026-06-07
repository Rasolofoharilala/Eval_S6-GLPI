export interface Certificate {
  id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  is_recursive?: boolean
  manufacturer?: Manufacturer
  user?: User
  user_tech?: User
  contact?: string
  contact_num?: string
  serial?: string
  otherserial?: string
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  location?: Location
  type?: CertificateType
  group?: Record<string, unknown>[]
  group_tech?: Record<string, unknown>[]
  template_name?: string
  is_template?: boolean
  dns_name?: string
  dns_suffix?: string
  is_selfsign?: boolean
  date_expiration?: string
  command?: string
  certificate_request?: string
  certificate_item?: string
}
