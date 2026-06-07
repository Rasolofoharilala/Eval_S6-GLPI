export interface AutomaticActionLog {
  id?: number
  automatic_action?: CronTask
  previous?: CronTaskLog
  date?: string
  state?: number
  elapsed_time?: number
  volume?: number
  message?: string
}
