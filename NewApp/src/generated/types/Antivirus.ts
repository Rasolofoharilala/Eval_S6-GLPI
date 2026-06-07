export interface Antivirus {
  id?: number
  itemtype?: string
  items_id?: number
  name?: string
  manufacturer?: Manufacturer
  antivirus_version?: string
  signature_version?: string
  is_active?: boolean
  is_deleted?: boolean
  is_up_to_date?: boolean
  is_dynamic?: boolean
  date_expiration?: string
  date_creation?: string
  date_mod?: string
}
