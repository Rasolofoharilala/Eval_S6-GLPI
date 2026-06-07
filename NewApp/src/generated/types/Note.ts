export interface Note {
  id?: number
  itemtype?: string
  items_id?: number
  user?: User
  user_editor?: User
  content?: string
  visible_from_ticket?: boolean
  date_creation?: string
  date_mod?: string
}
