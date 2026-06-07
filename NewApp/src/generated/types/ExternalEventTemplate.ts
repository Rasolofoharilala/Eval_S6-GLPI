export interface ExternalEventTemplate {
  id?: number
  name?: string
  text?: string
  comment?: string
  duration?: number
  before_time?: number
  rrule?: string
  category?: PlanningEventCategory
  state?: number
  is_background?: boolean
  date_creation?: string
  date_mod?: string
}
