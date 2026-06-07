export interface ValidationTemplate {
  id?: number
  name?: string
  content?: string
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  approval_step?: ValidationStep
  date_creation?: string
  date_mod?: string
}
