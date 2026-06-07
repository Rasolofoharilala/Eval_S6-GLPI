export interface AutomaticAction {
  id?: number
  itemtype?: string
  name?: string
  frequency?: number
  param?: number
  state?: number
  mode?: number
  allow_mode?: number
  min_hour?: number
  max_hour?: number
  logs_lifetime?: number
  last_run?: string
  comment?: string
  date_creation?: string
  date_mod?: string
}
