export interface ITILCategory {
  id?: number
  name?: string
  completename?: string
  level?: number
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: ITILCategory
  user?: User
  group?: Group
  code?: string
  is_helpdesk_visible?: boolean
  ticket_incident_template?: TicketTemplate
  ticket_request_template?: TicketTemplate
  change_template?: ChangeTemplate
  problem_template?: ProblemTemplate
  is_incident_visible?: boolean
  is_request_visible?: boolean
  is_change_visible?: boolean
  is_problem_visible?: boolean
  knowbase_category?: KnowbaseItemCategory
  date_creation?: string
  date_mod?: string
}
