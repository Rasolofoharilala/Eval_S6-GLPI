export interface Dashboard {
  id?: number
  key?: string
  name?: string
  context?: string
  user?: User
  filters?: Record<string, unknown>[]
  items?: Record<string, unknown>[]
}
