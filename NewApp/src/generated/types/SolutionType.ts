export interface SolutionType {
  id?: number
  name?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  is_incident?: boolean
  is_request?: boolean
  is_problem?: boolean
  is_change?: boolean
  date_creation?: string
  date_mod?: string
}
