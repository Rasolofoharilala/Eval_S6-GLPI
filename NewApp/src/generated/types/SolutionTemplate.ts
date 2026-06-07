export interface SolutionTemplate {
  id?: number
  name?: string
  content?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  type?: SolutionType
  date_creation?: string
  date_mod?: string
}
