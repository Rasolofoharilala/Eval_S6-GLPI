export interface BusinessCriticity {
  id?: number
  name?: string
  completename?: string
  level?: number
  comment?: string
  entity?: Entity
  is_recursive?: boolean
  parent?: BusinessCriticity
  date_creation?: string
  date_mod?: string
}
