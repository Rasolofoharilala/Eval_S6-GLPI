export interface EmailCollector {
  id?: number
  name?: string
  host?: string
  login?: string
  password?: string
  max_filesize?: number
  comment?: string
  is_active?: boolean
  accepted_folder?: string
  rejected_folder?: string
  errors?: number
  use_mail_date?: boolean
  requester_field?: boolean
  add_to_to_observer?: boolean
  add_cc_to_observer?: boolean
  collect_only_unread?: boolean
  create_user_from_email?: boolean
  date_last_collect?: string
  date_creation?: string
  date_mod?: string
}
