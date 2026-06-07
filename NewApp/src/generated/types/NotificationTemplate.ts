export interface NotificationTemplate {
  id?: number
  name?: string
  itemtype?: string
  comment?: string
  css?: string
  date_creation?: string
  date_mod?: string
  translations?: Record<string, unknown>[]
}
