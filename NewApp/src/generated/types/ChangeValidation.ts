export interface ChangeValidation {
  id?: number
  requester?: User
  approver?: User
  requested_approver_type?: string
  requested_approver_id?: number
  submission_comment?: string
  approval_comment?: string
  status?: number
  submission_date?: string
  approval_date?: string
  timeline_position?: number
  changes_id?: number
}
