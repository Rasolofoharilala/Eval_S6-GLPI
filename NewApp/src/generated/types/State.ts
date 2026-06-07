export interface State {
  id?: number
  name?: string
  completename?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: State
  level?: number
  is_visible_helpdesk?: boolean
  date_creation?: string
  date_mod?: string
  visibilities?: Record<string, unknown>
}
