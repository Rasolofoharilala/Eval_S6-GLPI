export interface Cluster {
  id?: number
  name?: string
  comment?: string
  status?: State
  entity?: Entity
  date_creation?: string
  date_mod?: string
  type?: ClusterType
  user_tech?: User
  group_tech?: Record<string, unknown>[]
  user?: User
  group?: Record<string, unknown>[]
  uuid?: string
  autoupdatesystem?: AutoUpdateSystem
  is_deleted?: boolean
}
