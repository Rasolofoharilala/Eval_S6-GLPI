export interface ProjectCost {
  id?: number
  project?: Project
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  cost?: number
  budget?: Budget
  entity?: Entity
  is_recursive?: boolean
}
