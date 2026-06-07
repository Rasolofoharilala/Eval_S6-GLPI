export interface TicketCost {
  id?: number
  ticket?: Ticket
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  duration?: number
  cost_time?: number
  cost_fixed?: number
  cost_material?: number
  budget?: Budget
  entity?: Entity
}
