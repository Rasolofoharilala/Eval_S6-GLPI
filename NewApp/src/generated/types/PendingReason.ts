export interface PendingReason {
  id?: number
  entity?: Entity
  is_recursive?: boolean
  is_default?: boolean
  name?: string
  followup_frequency?: number
  followups_before_resolution?: number
  followup_template?: ITILFollowupTemplate
  solution_template?: SolutionTemplate
  calendar?: Calendar
  comment?: string
}
