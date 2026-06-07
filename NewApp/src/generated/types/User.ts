export interface User {
  id?: number
  username?: string
  realname?: string
  firstname?: string
  phone?: string
  phone2?: string
  mobile?: string
  emails?: Record<string, unknown>[]
  comment?: string
  is_active?: boolean
  is_deleted?: boolean
  password?: string
  password2?: string
  picture?: string
  date_password_change?: string
  location?: Location
  authtype?: number
  last_login?: string
  default_profile?: Profile
  default_entity?: Entity
  date_creation?: string
  date_mod?: string
  date_sync?: string
  title?: UserTitle
  category?: UserCategory
  registration_number?: string
  begin_date?: string
  end_date?: string
  nickname?: string
  substitution_start_date?: string
  substitution_end_date?: string
}
