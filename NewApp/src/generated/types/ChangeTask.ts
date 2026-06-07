export interface ChangeTask {
  id?: number
  uuid?: string
  content?: string
  is_private?: boolean
  user?: User
  user_editor?: User
  user_tech?: User
  group_tech?: Group
  date?: string
  date_creation?: string
  date_mod?: string
  duration?: number
  planned_begin?: string
  planned_end?: string
  state?: number
  category?: TaskCategory
  timeline_position?: number
  changes_id?: number
}
