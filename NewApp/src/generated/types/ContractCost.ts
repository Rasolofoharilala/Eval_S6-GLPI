export interface ContractCost {
  id?: number
  contract?: Contract
  name?: string
  comment?: string
  date_begin?: string
  date_end?: string
  cost?: number
  budget?: Budget
  entity?: Entity
  is_recursive?: boolean
}
