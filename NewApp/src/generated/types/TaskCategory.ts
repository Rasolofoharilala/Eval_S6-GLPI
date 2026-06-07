export interface TaskCategory {
  id?: number
  name?: string
  is_active?: boolean
  entity?: Entity
  is_recursive?: boolean
  completename?: string
  parent?: TaskCategory
  level?: number
  is_helpdesk_visible?: boolean
  date_creation?: string
  date_mod?: string
}
