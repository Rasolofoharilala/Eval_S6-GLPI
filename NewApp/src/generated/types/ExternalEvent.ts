export interface ExternalEvent {
  id?: number
  uuid?: string
  name?: string
  text?: string
  template?: PlanningExternalEventTemplate
  category?: PlanningEventCategory
  entity?: Entity
  is_recursive?: boolean
  user?: User
  group?: Group
  date?: string
  date_begin?: string
  date_end?: string
  rrule?: string
  state?: number
  is_background?: boolean
  date_creation?: string
  date_mod?: string
}
