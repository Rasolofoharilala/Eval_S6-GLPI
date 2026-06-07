export interface SLALevel {
  id?: number
  uuid?: string
  name?: string
  entity?: Entity
  is_recursive?: boolean
  execution_time?: number
  operator?: string
  sla?: SLA
}
