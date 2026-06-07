export interface Followup {
  id?: number
  itemtype?: string
  items_id?: number
  content?: string
  is_private?: boolean
  user?: User
  user_editor?: User
  request_type?: RequestType
  date?: string
  date_creation?: string
  date_mod?: string
  timeline_position?: number
  source_item_id?: number
  source_of_item_id?: number
}
