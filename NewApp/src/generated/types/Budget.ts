export interface Budget {
  id?: number
  name?: string
  comment?: string
  location?: Location
  entity?: Entity
  type?: BudgetType
  is_deleted?: boolean
  value?: number
  date_begin?: string
  date_end?: string
  date_creation?: string
  date_mod?: string
}
