export interface DocumentCategory {
  id?: number
  name?: string
  completename?: string
  level?: number
  comment?: string
  parent?: DocumentCategory
  date_creation?: string
  date_mod?: string
}
