export interface WebhookCategory {
  id?: number
  name?: string
  completename?: string
  comment?: string
  parent?: WebhookCategory
  level?: number
  date_creation?: string
  date_mod?: string
}
