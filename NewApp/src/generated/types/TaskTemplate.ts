export interface TaskTemplate {
  id?: number
  name?: string
  content?: string
  comment?: string
  category?: TaskCategory
  entity?: Entity
  is_recursive?: boolean
  is_private?: boolean
  duration?: number
  state?: number
  user_tech?: User
  group_tech?: Group
  use_current_user?: boolean
  date_creation?: string
  date_mod?: string
}
