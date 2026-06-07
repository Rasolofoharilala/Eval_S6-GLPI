export interface Project {
  id?: number
  name?: string
  comment?: string
  content?: string
  code?: string
  priority?: number
  entity?: Entity
  tasks?: Record<string, unknown>[]
  costs?: Record<string, unknown>[]
  status?: ProjectState
  is_recursive?: boolean
  parent?: Project
  type?: ProjectType
  date?: string
  date_creation?: string
  date_mod?: string
  user?: User
  group?: Group
  plan_start_date?: string
  plan_end_date?: string
  real_start_date?: string
  real_end_date?: string
  percent_done?: number
  auto_percent_done?: boolean
  show_on_global_gantt?: boolean
  is_deleted?: boolean
  template_name?: string
  is_template?: boolean
  tickets?: Record<string, unknown>[]
  changes?: Record<string, unknown>[]
  problems?: Record<string, unknown>[]
  team?: Record<string, unknown>[]
}
