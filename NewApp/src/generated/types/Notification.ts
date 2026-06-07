export interface Notification {
  id?: number
  name?: string
  entity?: Entity
  is_recursive?: boolean
  is_active?: boolean
  itemtype?: string
  event?: string
  comment?: string
  allow_reply?: boolean
  attach_documents?: number
  date_creation?: string
  date_mod?: string
  recipients?: Record<string, unknown>[]
}
