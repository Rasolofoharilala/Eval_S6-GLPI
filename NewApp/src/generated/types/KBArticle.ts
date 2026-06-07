export interface KBArticle {
  id?: number
  name?: string
  content?: string
  categories?: Record<string, unknown>[]
  is_faq?: boolean
  entity?: Entity
  is_recursive?: boolean
  user?: User
  views?: number
  show_in_service_catalog?: boolean
  description?: string
  illustration?: string
  is_pinned?: boolean
  date_creation?: string
  date_mod?: string
  date_begin?: string
  date_end?: string
  revisions?: Record<string, unknown>[]
  translations?: Record<string, unknown>[]
}
