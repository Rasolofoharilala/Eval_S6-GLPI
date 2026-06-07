export interface OLALevel {
  id?: number
  uuid?: string
  name?: string
  entity?: Entity
  is_recursive?: boolean
  execution_time?: number
  operator?: string
  ola?: OLA
}
