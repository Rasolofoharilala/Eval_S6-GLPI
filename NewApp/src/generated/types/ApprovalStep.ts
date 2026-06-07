export interface ApprovalStep {
  id?: number
  name?: string
  comment?: string
  is_default?: boolean
  min_required_approval_percent?: number
}
