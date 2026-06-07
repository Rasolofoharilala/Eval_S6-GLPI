export interface RSSFeed {
  id?: number
  comment?: string
  url?: string
  refresh_interval?: number
  max_items?: number
  have_error?: boolean
  is_active?: boolean
  user?: User
  date_creation?: string
  date_mod?: string
}
