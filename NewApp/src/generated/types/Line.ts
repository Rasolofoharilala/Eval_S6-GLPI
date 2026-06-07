export interface Line {
  id?: number
  name?: string
  comment?: string
  status?: State
  location?: Location
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: LineType
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  user?: User
  group?: Record<string, unknown>[]
  is_deleted?: boolean
  caller_num?: string
  caller_name?: string
  operator?: LineOperator
}
