export interface RequestType {
  id?: number
  name?: string
  comment?: string
  is_helpdesk_default?: boolean
  is_followup_default?: boolean
  is_mail_default?: boolean
  is_mailfollowup_default?: boolean
  is_active?: boolean
  is_visible_ticket?: boolean
  is_visible_followup?: boolean
  date_creation?: string
  date_mod?: string
}
