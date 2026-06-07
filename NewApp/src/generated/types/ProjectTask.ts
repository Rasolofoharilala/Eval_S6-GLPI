export interface ProjectTask {
  id?: number
  name?: string
  comment?: string
  content?: string
  project?: Project
  parent_task?: ProjectTask
  status?: ProjectState
  entity?: Entity
  is_recursive?: boolean
  is_deleted?: boolean
  date_creation?: string
  date_mod?: string
  plan_start_date?: string
  plan_end_date?: string
  real_start_date?: string
  real_end_date?: string
  planned_duration?: number
  real_duration?: number
  auto_status?: boolean
  type?: ProjectTaskType
  user?: User
  percent_done?: number
  auto_percent_done?: boolean
  is_milestone?: boolean
  team?: Record<string, unknown>[]
}
